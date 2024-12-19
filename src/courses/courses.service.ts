import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './entities/courses.entity';
import { CreateCourseDto } from './dto/create-courses.dto';
import { UpdateCourseDto } from './dto/update-courses.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    private readonly categoryService: CategoryService,
  ) {}

  async getAllCourses(): Promise<Course[]> {
    try {
      return await this.courseModel
        .find()
        .populate('mentor')
        .populate('category')
        .exec();
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException('Failed to retrieve courses');
    }
  }

  async getCourseById(id: string): Promise<Course> {
    try {
      const course = await this.courseModel
        .findById(id)
        .populate('mentor')
        .populate('category')
        .exec();
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return course;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve the course');
    }
  }

  async createCourse(createDto: CreateCourseDto): Promise<Course> {
    try {
      // Ensure category exists
      const category = await this.categoryService.findOne(createDto.category);
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const newCourse = new this.courseModel(createDto);
      return await newCourse.save();
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create the course');
    }
  }

  async updateCourse(id: string, updateDto: UpdateCourseDto): Promise<Course> {
    try {
      const updatedCourse = await this.courseModel
        .findByIdAndUpdate(id, updateDto, { new: true, runValidators: true })
        .populate('mentor')
        .populate('category')
        .exec();

      if (!updatedCourse) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }

      return updatedCourse;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update the course');
    }
  }

  async deleteCourse(id: string): Promise<void> {
    try {
      const result = await this.courseModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete the course');
    }
  }
}
