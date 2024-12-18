import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseModule } from './entities/course-module.entity';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';

@Injectable()
export class CourseModuleService {
  constructor(
    @InjectModel(CourseModule.name)
    private readonly model: Model<CourseModule>,
  ) {}

  async create(dto: CreateCourseModuleDto): Promise<CourseModule> {
    const newModule = new this.model(dto);
    return newModule.save();
  }

  async findAll(): Promise<CourseModule[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<CourseModule> {
    const data = await this.model.findById(id).exec();
    if (!data) throw new NotFoundException(`Module with ID ${id} not found`);
    return data;
  }

  async update(id: string, dto: CreateCourseModuleDto): Promise<CourseModule> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException(`Module with ID ${id} not found`);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Module with ID ${id} not found`);
  }
}
