import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseModule } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Course } from 'src/courses/entities/courses.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(CourseModule.name)
    private readonly moduleModel: Model<CourseModule>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<CourseModule> {
    try {
      const { course } = createModuleDto;

      // Kurs mavjudligini tekshiramiz
      const foundCourse = await this.courseModel.findById(course).exec();
      if (!foundCourse) {
        throw new NotFoundException(`Course with ID ${course} not found`);
      }

      const newModule = new this.moduleModel(createModuleDto);
      return await newModule.save();
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create module');
    }
  }

  async findAll(): Promise<CourseModule[]> {
    try {
      return await this.moduleModel.find().populate('course').exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch modules');
    }
  }

  async findByCourseId(courseId: string): Promise<CourseModule[]> {
    try {
      const modules = await this.moduleModel
        .find({ course: courseId })
        .populate('course')
        .exec();
      return modules;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch modules by course',
      );
    }
  }

  async findOne(id: string): Promise<CourseModule> {
    const module = await this.moduleModel
      .findById(id)
      .populate('course')
      .exec();
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return module;
  }

  async update(
    id: string,
    updateModuleDto: UpdateModuleDto,
  ): Promise<CourseModule> {
    const updatedModule = await this.moduleModel
      .findByIdAndUpdate(id, updateModuleDto, {
        new: true,
        runValidators: true,
      })
      .populate('course')
      .exec();

    if (!updatedModule) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    return updatedModule;
  }

  async remove(id: string): Promise<void> {
    const result = await this.moduleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
  }
}
