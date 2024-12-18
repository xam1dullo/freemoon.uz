import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './entities/content.entity';
import { Model } from 'mongoose';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private readonly model: Model<Content>,
  ) {}

  async create(dto: CreateContentDto): Promise<Content> {
    const newData = new this.model(dto);
    return newData.save();
  }

  async findAll(): Promise<Content[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<Content> {
    const data = await this.model.findById(id).exec();
    if (!data) throw new NotFoundException(`Data with ID ${id} not found`);
    return data;
  }

  async update(id: string, dto: UpdateContentDto): Promise<Content> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException(`Data with ID ${id} not found`);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Data with ID ${id} not found`);
  }
}
