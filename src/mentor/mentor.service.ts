import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mentor } from './entities/mentor.entity';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class MentorService {
  constructor(
    @InjectModel(Mentor.name) private readonly mentorModel: Model<Mentor>,
    private readonly categoryService: CategoryService,
  ) {}

  /**
   * Create a new Mentor.
   * Validates that the given category ID is valid.
   */
  async create(dto: CreateMentorDto): Promise<Mentor> {
    try {
      const category = await this.categoryService.findOne(dto.category);
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const newMentor = new this.mentorModel(dto);
      return await newMentor.save();
    } catch (error) {
      // Log error if needed
      // console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create mentor');
    }
  }

  /**
   * Retrieve all mentors.
   * Using `.lean()` for performance since we only need plain objects.
   */
  async findAll(): Promise<Mentor[]> {
    try {
      const mentors = await this.mentorModel
        .find()
        .lean()
        .populate('category') // Populate the 'category' field
        .exec();
      return mentors as Mentor[];
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to retrieve mentors');
    }
  }

  /**
   * Retrieve a mentor by ID.
   * Using `.lean()` for performance since we only need a plain object.
   */
  async findOne(id: string): Promise<Mentor> {
    try {
      const mentor = await this.mentorModel
        .findById(id)
        .lean()
        .populate('category') // Populate the 'category' field
        .exec();

      if (!mentor)
        throw new NotFoundException(`Mentor with ID ${id} not found`);
      return mentor as Mentor;
    } catch (error) {
      // console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve mentor');
    }
  }

  /**
   * Update an existing mentor by ID.
   * Returns the updated mentor as a document (not lean) since we might need the updated doc state.
   */
  async update(id: string, dto: CreateMentorDto): Promise<Mentor> {
    try {
      const updatedMentor = await this.mentorModel
        .findByIdAndUpdate(id, dto, {
          new: true,
        })
        .exec();

      if (!updatedMentor) {
        throw new NotFoundException(`Mentor with ID ${id} not found`);
      }

      return updatedMentor;
    } catch (error) {
      // console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update mentor');
    }
  }

  /**
   * Delete a mentor by ID.
   */
  async delete(id: string): Promise<void> {
    try {
      const result = await this.mentorModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Mentor with ID ${id} not found`);
      }
    } catch (error) {
      // console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete mentor');
    }
  }
}
