import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageKitService } from 'imagekit-nestjs';

import { CoursesService } from './courses.service';
import { CourseResponseDto } from './dto/course-response.dto';
import { UpdateCourseDto } from './dto/update-courses.dto';
import { CreateCourseDto } from './dto/create-courses.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly imageKitService: ImageKitService,
  ) {}

  @ApiOperation({ summary: 'Barcha kurslarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Kurslar muvaffaqiyatli olindi.',
    type: [CourseResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Get()
  async getAll() {
    return this.coursesService.getAllCourses();
  }

  @ApiOperation({ summary: 'ID bo‘yicha kursni olish' })
  @ApiResponse({
    status: 200,
    description: 'Kurs muvaffaqiyatli topildi.',
    type: CourseResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Kurs topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @ApiOperation({ summary: 'Yangi kurs yaratish' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({
    status: 201,
    description: 'Kurs muvaffaqiyatli yaratildi.',
    type: CourseResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Berilgan kategoriya topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Post()
  async create(@Body() createDto: CreateCourseDto) {
    return this.coursesService.createCourse(createDto);
  }

  @ApiOperation({ summary: 'Kursni yangilash' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({
    status: 200,
    description: 'Kurs muvaffaqiyatli yangilandi.',
    type: CourseResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Kurs topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, updateDto);
  }

  @ApiOperation({ summary: 'Kursni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Kurs muvaffaqiyatli o‘chirildi.' })
  @ApiNotFoundResponse({ description: 'Kurs topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }

  @ApiOperation({ summary: 'Kurs uchun fayl yuklash' })
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
    description: 'Fayl muvaffaqiyatli yuklandi.',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://example.com/file.jpg' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Kurs topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Fayl yuklashda xato yuz berdi.',
  })
  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileBase64 = file.buffer.toString('base64');
    const result = await this.imageKitService.upload({
      file: fileBase64,
      fileName: file.originalname,
    });
    return { url: result.url };
  }
}
