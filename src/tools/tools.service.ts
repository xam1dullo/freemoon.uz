// src/tools/tools.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tools, ToolsDocument } from './entities/tool.entity';
import { CreateToolsDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Injectable()
export class ToolsService {
  constructor(
    @InjectModel(Tools.name) private toolsModel: Model<ToolsDocument>,
  ) {}

  // Yangi Tools yaratish
  async create(createToolsDto: CreateToolsDto): Promise<Tools> {
    console.log(createToolsDto);

    const createdTools = new this.toolsModel({
      ...createToolsDto,
      courseId: new Types.ObjectId(createToolsDto.courseId),
    });
    console.log(createdTools);

    return createdTools.save();
  }

  // Barcha Tools hujjatlarini olish
  async findAll(): Promise<Tools[]> {
    return this.toolsModel.find().populate('courseId').exec();
  }

  // Bitta Tools hujjatini ID bo'yicha topish
  async findOne(id: string): Promise<Tools> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const tools = await this.toolsModel
      .findById(id)
      .populate('courseId')
      .exec();
    if (!tools) {
      throw new NotFoundException('Tools not found');
    }
    return tools;
  }

  // Tools hujjatini yangilash
  async update(id: string, updateToolsDto: UpdateToolDto): Promise<Tools> {
    if (
      updateToolsDto.courseId &&
      !Types.ObjectId.isValid(updateToolsDto.courseId)
    ) {
      throw new NotFoundException('Invalid courseId format');
    }

    const updatedTools = await this.toolsModel
      .findByIdAndUpdate(
        id,
        {
          ...updateToolsDto,
          ...(updateToolsDto.courseId && {
            courseId: new Types.ObjectId(updateToolsDto.courseId),
          }),
        },
        { new: true },
      )
      .populate('courseId')
      .exec();

    if (!updatedTools) {
      throw new NotFoundException('Tools not found');
    }

    return updatedTools;
  }

  // Tools hujjatini o'chirish
  async remove(id: string): Promise<Tools> {
    const deletedTools = await this.toolsModel.findByIdAndDelete(id).exec();
    if (!deletedTools) {
      throw new NotFoundException('Tools not found');
    }
    return deletedTools;
  }

  // Belli bir kurs ID bo'yicha Tools hujjatlarini olish
  async findByCourseId(courseId: string): Promise<Tools[]> {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new NotFoundException('Invalid courseId format');
    }
    return this.toolsModel
      .find({ courseId: new Types.ObjectId(courseId) })
      .populate('courseId')
      .exec();
  }
}
