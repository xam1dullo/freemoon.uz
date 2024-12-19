import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { Mentor } from './entities/mentor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImageKitService } from 'imagekit-nestjs';

@ApiTags('Mentors') // Swagger bo'lim nomi
@Controller('mentors')
export class MentorController {
  constructor(
    private readonly mentorService: MentorService,
    private readonly imageKitService: ImageKitService,
  ) {}

  @ApiOperation({ summary: 'Yangi mentor yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Mentor muvaffaqiyatli yaratildi.',
    type: Mentor,
  })
  @Post()
  async create(@Body() dto: CreateMentorDto): Promise<Mentor> {
    return this.mentorService.create(dto);
  }

  @ApiOperation({ summary: 'Mentor uchun rasm yuklash' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Rasmni yuklash uchun fayl maydoni',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Rasm muvaffaqiyatli yuklandi.',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://example.com/image.jpg' },
      },
    },
  })
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async image(@UploadedFile() file: Express.Multer.File) {
    const fileBase64 = file.buffer.toString('base64');
    const result = await this.imageKitService.upload({
      file: fileBase64,
      fileName: file.originalname,
    });
    return { url: result.url };
  }

  @ApiOperation({ summary: 'Barcha mentorlarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Mentorlar roʻyxati muvaffaqiyatli olindi.',
    type: [Mentor],
  })
  @Get()
  async findAll(): Promise<Mentor[]> {
    return this.mentorService.findAll();
  }

  @ApiOperation({ summary: 'ID orqali mentorni olish' })
  @ApiResponse({
    status: 200,
    description: 'Mentor muvaffaqiyatli topildi.',
    type: Mentor,
  })
  @ApiResponse({ status: 404, description: 'Mentor topilmadi.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Mentor> {
    return this.mentorService.findOne(id);
  }

  @ApiOperation({ summary: "Mentor ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: 'Mentor muvaffaqiyatli yangilandi.',
    type: Mentor,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateMentorDto,
  ): Promise<Mentor> {
    return this.mentorService.update(id, dto);
  }

  @ApiOperation({ summary: "Mentorni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mentor muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: 'Mentor topilmadi.' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.mentorService.delete(id);
  }
}
