import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tools } from './entities/tool.entity';
import { CreateToolsDto } from './dto/create-tool.dto';

@Injectable()
export class ToolsService {
  constructor(
    @InjectModel(Tools.name) private readonly toolsModel: Model<Tools>,
  ) {}

  async create(dto: CreateToolsDto): Promise<Tools> {
    const newTools = new this.toolsModel(dto);
    return newTools.save();
  }

  async findAll(): Promise<Tools[]> {
    return this.toolsModel.find().exec();
  }

  async findOne(id: string): Promise<Tools> {
    const tools = await this.toolsModel.findById(id).exec();
    if (!tools) throw new NotFoundException(`Tools with ID ${id} not found`);
    return tools;
  }

  async update(id: string, dto: CreateToolsDto): Promise<Tools> {
    const updatedTools = await this.toolsModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedTools)
      throw new NotFoundException(`Tools with ID ${id} not found`);
    return updatedTools;
  }

  async delete(id: string): Promise<void> {
    const result = await this.toolsModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Tools with ID ${id} not found`);
  }
}
