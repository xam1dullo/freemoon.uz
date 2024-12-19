import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skills } from './entities/skill.entity';
import { CreateSkillsDto } from './dto/create-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skills.name) private readonly skillsModel: Model<Skills>,
  ) {}

  async create(dto: CreateSkillsDto): Promise<Skills> {
    const newSkills = new this.skillsModel(dto);
    return newSkills.save();
  }

  async findAll(): Promise<Skills[]> {
    return this.skillsModel.find().exec();
  }

  async findOne(id: string): Promise<Skills> {
    const skills = await this.skillsModel.findById(id).exec();
    if (!skills) throw new NotFoundException(`Skills with ID ${id} not found`);
    return skills;
  }

  async update(id: string, dto: CreateSkillsDto): Promise<Skills> {
    const updatedSkills = await this.skillsModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedSkills)
      throw new NotFoundException(`Skills with ID ${id} not found`);
    return updatedSkills;
  }

  async delete(id: string): Promise<void> {
    const result = await this.skillsModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Skills with ID ${id} not found`);
  }
}
