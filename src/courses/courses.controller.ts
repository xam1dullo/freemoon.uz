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
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImageKitService } from 'imagekit-nestjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseResponseDto } from './dto/course-response.dto';
import { UpdateCourseDto } from './dto/update-courses.dto';
import { CreateCourseDto } from './dto/create-courses.dto';
@ApiTags('Courses') // Swagger uchun guruh
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

  @ApiOperation({ summary: 'ID bo‘yicha kursni olish' })
  @ApiResponse({
    status: 200,
    description: 'Kurs muvaffaqiyatli topildi.',
    type: CourseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Kurs topilmadi.' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @ApiOperation({ summary: 'Yangi kurs yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Kurs muvaffaqiyatli yaratildi.',
    type: CourseResponseDto,
  })
  @Post()
  async create(@Body() createDto: CreateCourseDto) {
    return this.coursesService.createCourse(createDto);
  }

  @ApiOperation({ summary: 'Kursni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Kurs muvaffaqiyatli yangilandi.',
    type: CourseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Kurs topilmadi.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, updateDto);
  }

  @ApiOperation({ summary: 'Kursni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Kurs muvaffaqiyatli o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Kurs topilmadi.' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }

  @ApiOperation({ summary: 'Kurs uchun fayl yuklash' })
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

  @ApiOperation({ summary: 'Kursga yangi modul qo‘shish' })
  @ApiResponse({
    status: 200,
    description: 'Modul muvaffaqiyatli qo‘shildi.',
  })
  @Post(':courseId/modules')
  async addModule(
    @Param('courseId') courseId: string,
    @Body() moduleData: any,
  ) {
    return this.coursesService.addModule(courseId, moduleData);
  }
}
