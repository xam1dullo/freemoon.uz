import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { SkillsAndToolsService } from './skills-and-tools.service';
import { CreateSkillsAndToolsDto } from './dto/create-skills-and-tool.dto';
import { SkillsAndTools } from './entities/skills-and-tool.entity';

@Controller('skills-and-tools')
export class SkillsAndToolsController {
  constructor(private readonly service: SkillsAndToolsService) {}

  @Post()
  async create(@Body() dto: CreateSkillsAndToolsDto): Promise<SkillsAndTools> {
    return this.service.create(dto);
  }

  @Get()
  async findAll(): Promise<SkillsAndTools[]> {
    return this.service.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateSkillsAndToolsDto,
  ): Promise<SkillsAndTools> {
    return this.service.update(id, dto);
  }
}
