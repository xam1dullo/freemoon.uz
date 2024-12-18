import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CourseModuleService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { CourseModule } from './entities/course-module.entity';

@Controller('course-modules')
export class CourseModuleController {
  constructor(private readonly service: CourseModuleService) {}

  @Post()
  async create(@Body() dto: CreateCourseModuleDto): Promise<CourseModule> {
    return this.service.create(dto);
  }

  @Get()
  async findAll(): Promise<CourseModule[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseModule> {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateCourseModuleDto,
  ): Promise<CourseModule> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
