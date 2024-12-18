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
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { Mentor } from './entities/mentor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImageKitService } from 'imagekit-nestjs';

@Controller('mentors')
export class MentorController {
  constructor(
    private readonly mentorService: MentorService,
    private readonly imageKitService: ImageKitService,
  ) {}

  @Post()
  async create(@Body() dto: CreateMentorDto): Promise<Mentor> {
    return this.mentorService.create(dto);
  }

  @Post()
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
    return result.url;
  }

  @Get()
  async findAll(): Promise<Mentor[]> {
    return this.mentorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Mentor> {
    return this.mentorService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateMentorDto,
  ): Promise<Mentor> {
    return this.mentorService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.mentorService.delete(id);
  }
}
