import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(
    page: number,
    limit: number,
    search?: string,
    category?: string,
  ): Promise<{ data: Tools[]; total: number; page: number; limit: number }> {
    try {
      const query: any = {};

      if (category) {
        query.category = category;
      }

      if (search) {
        // title yoki description ichida qidirish
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const total = await this.toolsModel.countDocuments(query).exec();
      const data = await this.toolsModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        // Agar tools ham mentor yoki category bilan bog'langan bo'lsa populate qilishingiz mumkin
        .exec();

      return { data, total, page, limit };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tools');
    }
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
