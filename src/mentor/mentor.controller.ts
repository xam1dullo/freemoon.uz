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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { Mentor } from './entities/mentor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImageKitService } from 'imagekit-nestjs';

@ApiTags('Mentors')
@Controller('mentors')
export class MentorController {
  constructor(
    private readonly mentorService: MentorService,
    private readonly imageKitService: ImageKitService,
  ) {}

  @ApiOperation({ summary: 'Yangi mentor yaratish' })
  @ApiBody({
    type: CreateMentorDto,
    description: 'Yaratish uchun kerakli ma’lumotlar',
  })
  @ApiResponse({
    status: 201,
    description: 'Mentor muvaffaqiyatli yaratildi.',
    type: Mentor,
  })
  @ApiNotFoundResponse({ description: 'Berilgan kategoriyani topib bo‘lmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Post()
  async create(@Body() dto: CreateMentorDto): Promise<Mentor> {
    return this.mentorService.create(dto);
  }
  createToolsDto
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
        url: { type: 'string' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Rasm yuklashda xato yuz berdi.',
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

  @ApiOperation({
    summary: 'Barcha mentorlarni olish (filter, search, pagination bilan)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Sahifa raqami',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Har sahifada nechta yozuv',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Qidirish so`zi',
    example: 'John',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Kategoriya ID',
    example: '60c72b2f9f1b2c001f0e4abd',
  })
  @ApiResponse({
    status: 200,
    description: 'Mentorlar muvaffaqiyatli olindi.',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/Mentor' } },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
      },
    },
  })
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ): Promise<{ data: Mentor[]; total: number; page: number; limit: number }> {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    return this.mentorService.findAll(
      pageNumber,
      limitNumber,
      search,
      category,
    );
  }

  @ApiOperation({ summary: 'ID orqali mentorni olish' })
  @ApiResponse({
    status: 200,
    description: 'Mentor muvaffaqiyatli topildi.',
    type: Mentor,
  })
  @ApiNotFoundResponse({ description: 'Mentor topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Mentorni olishda xatolik yuz berdi.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Mentor> {
    return this.mentorService.findOne(id);
  }

  @ApiOperation({ summary: "Mentor ma'lumotlarini yangilash" })
  @ApiBody({
    type: CreateMentorDto,
    description: 'Yangilanishi kerak bo‘lgan ma’lumotlar',
  })
  @ApiResponse({
    status: 200,
    description: 'Mentor muvaffaqiyatli yangilandi.',
    type: Mentor,
  })
  @ApiNotFoundResponse({ description: 'Yangilanadigan mentor topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Mentorni yangilashda xatolik yuz berdi.',
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
  @ApiNotFoundResponse({
    description: 'O‘chirilishi kerak bo‘lgan mentor topilmadi.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Mentorni o‘chirishda xatolik yuz berdi.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.mentorService.delete(id);
  }
}
