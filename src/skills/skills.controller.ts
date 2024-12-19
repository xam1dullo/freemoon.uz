import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';

import { SkillsService } from './skills.service';
import { CreateSkillsDto } from './dto/create-skill.dto';
import { SkillsResponseDto } from './dto/response.skill.dto';
import { Skills } from './entities/skill.entity';
import { UpdateSkillDto } from './dto/update-skill.dto';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({ summary: 'Yangi skill kategoriyasi yaratish' })
  @ApiBody({ type: CreateSkillsDto })
  @ApiResponse({
    status: 201,
    description: 'Skill kategoriya muvaffaqiyatli yaratildi.',
    type: SkillsResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Post()
  async create(@Body() createDto: CreateSkillsDto): Promise<Skills> {
    return this.skillsService.create(createDto);
  }

  @ApiOperation({ summary: 'Barcha skill kategoriyalarini olish' })
  @ApiResponse({
    status: 200,
    description: 'Skill kategoriyalar muvaffaqiyatli olindi.',
    type: [SkillsResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Get()
  async findAll(): Promise<Skills[]> {
    return this.skillsService.findAll();
  }

  @ApiOperation({ summary: 'ID bo‘yicha skill kategoriyasini olish' })
  @ApiResponse({
    status: 200,
    description: 'Skill kategoriya muvaffaqiyatli topildi.',
    type: SkillsResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Skill kategoriya topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Skills> {
    return this.skillsService.findOne(id);
  }

  @ApiOperation({ summary: 'Skill kategoriyasini yangilash' })
  @ApiBody({ type: UpdateSkillDto })
  @ApiResponse({
    status: 200,
    description: 'Skill kategoriya muvaffaqiyatli yangilandi.',
    type: SkillsResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Skill kategoriya topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSkillDto,
  ): Promise<Skills> {
    return this.skillsService.update(id, updateDto);
  }

  @ApiOperation({ summary: "Skill kategoriyasini o'chirish" })
  @ApiResponse({
    status: 200,
    description: 'Skill kategoriya muvaffaqiyatli o‘chirildi.',
  })
  @ApiNotFoundResponse({ description: 'Skill kategoriya topilmadi.' })
  @ApiInternalServerErrorResponse({
    description: 'Ichki server xatosi yuz berdi.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.skillsService.remove(id);
  }
}
