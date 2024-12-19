import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = new this.categoryModel(createCategoryDto);
      return await newCategory.save();
    } catch (error) {
      // Log the error if needed
      console.error(error);
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  async findOne(id: string): Promise<Category> {
    try {
      return await this.categoryModel.findById(id).exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch the category');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    try {
      return await this.categoryModel
        .updateOne({ _id: id }, updateCategoryDto)
        .exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update the category');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.categoryModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to remove the category');
    }
  }
}
