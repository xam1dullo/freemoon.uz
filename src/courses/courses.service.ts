import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './entities/courses.entity';
import { CreateCourseDto } from './dto/create-courses.dto';
import { UpdateCourseDto } from './dto/update-courses.dto';
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  // Barcha kurslarni olish
  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  // ID bo'yicha kursni olish
  async getCourseById(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  // Yangi kurs yaratish
  async createCourse(createDto: CreateCourseDto): Promise<Course> {
    const newCourse = new this.courseModel(createDto);
    return newCourse.save();
  }

  // Kursni yangilash
  async updateCourse(id: string, updateDto: UpdateCourseDto): Promise<Course> {
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateDto, { new: true, runValidators: true })
      .exec();
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  // Kursni o'chirish
  async deleteCourse(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }

  async addModule(courseId: string, moduleData: any): Promise<Course> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Modulni qo'shish
    if (!course.modules) {
      course.modules = [];
    }
    course.modules.push(moduleData);

    // Yangilangan hujjatni saqlash
    return this.courseModel
      .findByIdAndUpdate(
        courseId,
        { modules: course.modules },
        { new: true, runValidators: true },
      )
      .exec();
  }
}
