import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skills } from './entities/skill.entity';
import { CreateSkillsDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skills.name) private readonly skillsModel: Model<Skills>,
  ) {}

  async create(createDto: CreateSkillsDto): Promise<Skills> {
    try {
      const newSkills = new this.skillsModel(createDto);
      return await newSkills.save();
    } catch (error) {
      // You can log error if needed: console.error(error);
      throw new InternalServerErrorException('Failed to create skills');
    }
  }

  async findAll(): Promise<Skills[]> {
    try {
      return await this.skillsModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve skills');
    }
  }

  async findOne(id: string): Promise<Skills> {
    try {
      const skill = await this.skillsModel.findById(id).exec();
      if (!skill) {
        throw new NotFoundException(`Skills with ID ${id} not found`);
      }
      return skill;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve the skill');
    }
  }

  async update(id: string, updateDto: UpdateSkillDto): Promise<Skills> {
    try {
      const updatedSkill = await this.skillsModel
        .findByIdAndUpdate(id, updateDto, { new: true, runValidators: true })
        .exec();
      if (!updatedSkill) {
        throw new NotFoundException(`Skills with ID ${id} not found`);
      }
      return updatedSkill;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update the skills');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.skillsModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Skills with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete the skills');
    }
  }
}
