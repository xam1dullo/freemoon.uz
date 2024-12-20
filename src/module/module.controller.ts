import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ModulesService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { CourseModule } from './entities/module.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @ApiOperation({ summary: 'Create a new module' })
  @ApiResponse({
    status: 201,
    description: 'Module successfully created',
    type: CourseModule,
  })
  @Post()
  async create(
    @Body() createModuleDto: CreateModuleDto,
  ): Promise<CourseModule> {
    return this.modulesService.create(createModuleDto);
  }

  @ApiOperation({ summary: 'Get all modules' })
  @ApiResponse({
    status: 200,
    description: 'List of modules',
    type: [CourseModule],
  })
  @Get()
  async findAll(): Promise<CourseModule[]> {
    return this.modulesService.findAll();
  }

  @ApiOperation({ summary: 'Get modules by course ID' })
  @ApiResponse({
    status: 200,
    description: 'Modules filtered by course',
    type: [CourseModule],
  })
  @Get('course/:courseId')
  async findByCourseId(
    @Param('courseId') courseId: string,
  ): Promise<CourseModule[]> {
    return this.modulesService.findByCourseId(courseId);
  }

  @ApiOperation({ summary: 'Get a module by its ID' })
  @ApiResponse({ status: 200, description: 'The module', type: CourseModule })
  @ApiResponse({ status: 404, description: 'Module not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseModule> {
    return this.modulesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a module by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Module updated',
    type: CourseModule,
  })
  @ApiResponse({ status: 404, description: 'Module not found' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<CourseModule> {
    return this.modulesService.update(id, updateModuleDto);
  }

  @ApiOperation({ summary: 'Delete a module by its ID' })
  @ApiResponse({ status: 200, description: 'Module successfully deleted' })
  @ApiResponse({ status: 404, description: 'Module not found' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.modulesService.remove(id);
  }
}
