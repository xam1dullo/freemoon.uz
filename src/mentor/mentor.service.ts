import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mentor } from './entities/mentor.entity';
import { CreateMentorDto } from './dto/create-mentor.dto';

@Injectable()
export class MentorService {
  constructor(
    @InjectModel(Mentor.name) private readonly mentorModel: Model<Mentor>,
  ) {}

  async create(dto: CreateMentorDto): Promise<Mentor> {
    const newMentor = new this.mentorModel(dto);
    return newMentor.save();
  }

  async findAll(): Promise<Mentor[]> {
    return this.mentorModel.find().exec();
  }

  async findOne(id: string): Promise<Mentor> {
    const mentor = await this.mentorModel.findById(id).exec();
    if (!mentor) throw new NotFoundException(`Mentor with ID ${id} not found`);
    return mentor;
  }

  async update(id: string, dto: CreateMentorDto): Promise<Mentor> {
    const updatedMentor = await this.mentorModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedMentor)
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    return updatedMentor;
  }

  async delete(id: string): Promise<void> {
    const result = await this.mentorModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Mentor with ID ${id} not found`);
  }
}
