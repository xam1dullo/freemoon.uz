import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './entities/courses.entity';
import { CourseModule } from 'src/course-modules/entities/course-module.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(CourseModule.name) private moduleModel: Model<CourseModule>,
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
    const module = await new this.moduleModel({
      ...moduleData,
      courseId,
    }).save();
    return module;
  }
}
