import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './entities/courses.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async getAllCourses() {
    return this.courseModel.find().populate({
      path: 'modules',
      populate: { path: 'children' },
    });
  }

  async createCourse(createDto: any) {
    return new this.courseModel(createDto).save();
  }

  async addModule(courseId: string, moduleData: any) {
    const module = await new this.courseModel({
      ...moduleData,
      courseId,
    }).save();
    return module;
  }
}
