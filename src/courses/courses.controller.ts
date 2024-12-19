import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImageKitService } from 'imagekit-nestjs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CourseResponseDto } from './dto/course-response.dto';

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
  @Get()
  async getAll() {
    return this.coursesService.getAllCourses();
  }

  @ApiOperation({ summary: 'Yangi kurs yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Kurs muvaffaqiyatli yaratildi.',
    type: CourseResponseDto,
  })
  @Post()
  async create(@Body() createDto: any) {
    return this.coursesService.createCourse(createDto);
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

  @Post(':courseId/modules')
  async addModule(
    @Param('courseId') courseId: string,
    @Body() moduleData: any,
  ) {
    return this.coursesService.addModule(courseId, moduleData);
  }
}
