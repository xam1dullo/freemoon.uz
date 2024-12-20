// src/skills/skills.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Skills, SkillsDocument } from './entities/skill.entity';
import { CreateSkillsDto } from './dto/create-skill.dto';
import { UpdateSkillsDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skills.name) private skillsModel: Model<SkillsDocument>,
  ) {}

  // Yangi Skills yaratish
  async create(createSkillsDto: CreateSkillsDto): Promise<Skills> {
    const createdSkills = new this.skillsModel({
      ...createSkillsDto,
      courseId: new Types.ObjectId(createSkillsDto.courseId),
    });
    return createdSkills.save();
  }

  // Barcha Skills hujjatlarini olish
  async findAll(): Promise<Skills[]> {
    return this.skillsModel.find().populate('courseId').exec();
  }

  // Bitta Skills hujjatini ID bo'yicha topish
  async findOne(id: string): Promise<Skills> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const skills = await this.skillsModel
      .findById(id)
      .populate('courseId')
      .exec();
    if (!skills) {
      throw new NotFoundException('Skills not found');
    }
    return skills;
  }

  // Skills hujjatini yangilash
  async update(id: string, updateSkillsDto: UpdateSkillsDto): Promise<Skills> {
    if (
      updateSkillsDto.courseId &&
      !Types.ObjectId.isValid(updateSkillsDto.courseId)
    ) {
      throw new NotFoundException('Invalid courseId format');
    }

    const updatedSkills = await this.skillsModel
      .findByIdAndUpdate(
        id,
        {
          ...updateSkillsDto,
          ...(updateSkillsDto.courseId && {
            courseId: new Types.ObjectId(updateSkillsDto.courseId),
          }),
        },
        { new: true },
      )
      .populate('courseId')
      .exec();

    if (!updatedSkills) {
      throw new NotFoundException('Skills not found');
    }

    return updatedSkills;
  }

  // Skills hujjatini o'chirish
  async remove(id: string): Promise<Skills> {
    const deletedSkills = await this.skillsModel.findByIdAndDelete(id).exec();
    if (!deletedSkills) {
      throw new NotFoundException('Skills not found');
    }
    return deletedSkills;
  }

  // Belli bir kurs ID bo'yicha Tools hujjatlarini olish
  async findByCourseId(courseId: string): Promise<Skills[]> {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new NotFoundException('Invalid courseId format');
    }
    return this.skillsModel
      .find({ courseId: new Types.ObjectId(courseId) })
      .populate('courseId')
      .exec();
  }
}
