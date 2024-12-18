import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillsAndTools } from './entities/skills-and-tool.entity';
import { CreateSkillsAndToolsDto } from './dto/create-skills-and-tool.dto';

@Injectable()
export class SkillsAndToolsService {
  constructor(
    @InjectModel(SkillsAndTools.name)
    private readonly model: Model<SkillsAndTools>,
  ) {}

  async create(dto: CreateSkillsAndToolsDto): Promise<SkillsAndTools> {
    const data = new this.model(dto);
    return data.save();
  }

  async findAll(): Promise<SkillsAndTools[]> {
    return this.model.find().exec();
  }

  async update(
    id: string,
    dto: CreateSkillsAndToolsDto,
  ): Promise<SkillsAndTools> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException(`Data with ID ${id} not found`);
    return updated;
  }
}
