// src/skills/skills.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SkillsService } from './skills.service';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Skills } from './entities/skill.entity';
import { CreateSkillsDto } from './dto/create-skill.dto';
import { UpdateSkillsDto } from './dto/update-skill.dto';

@ApiTags('skills') // Controller tagi
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi ko‘nikma yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Ko‘nikma muvaffaqiyatli yaratildi.',
    type: Skills,
  })
  @ApiResponse({ status: 400, description: 'Xatolik yuz berdi.' })
  async create(@Body() createSkillsDto: CreateSkillsDto): Promise<Skills> {
    return this.skillsService.create(createSkillsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha ko‘nikmalarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli olindi.',
    type: [Skills],
  })
  async findAll(): Promise<Skills[]> {
    return this.skillsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta ko‘nikmani ID bo‘yicha olish' })
  @ApiParam({ name: 'id', description: 'Ko‘nikma ID si' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli olindi.',
    type: Skills,
  })
  @ApiResponse({ status: 404, description: 'Ko‘nikma topilmadi.' })
  async findOne(@Param('id') id: string): Promise<Skills> {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Ko‘nikmani yangilash' })
  @ApiParam({ name: 'id', description: 'Ko‘nikma ID si' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli yangilandi.',
    type: Skills,
  })
  @ApiResponse({ status: 404, description: 'Ko‘nikma topilmadi.' })
  async update(
    @Param('id') id: string,
    @Body() updateSkillsDto: UpdateSkillsDto,
  ): Promise<Skills> {
    return this.skillsService.update(id, updateSkillsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Ko‘nikmani o‘chirish' })
  @ApiParam({ name: 'id', description: 'Ko‘nikma ID si' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli o‘chirildi.',
    type: Skills,
  })
  @ApiResponse({ status: 404, description: 'Ko‘nikma topilmadi.' })
  async remove(@Param('id') id: string): Promise<Skills> {
    return this.skillsService.remove(id);
  }

  // Belli bir kurs ID bo'yicha Skills hujjatlarini olish
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Belli bir kurs ID bo‘yicha ko‘nikmalarni olish' })
  @ApiParam({ name: 'courseId', description: 'Kurs ID si' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli olindi.',
    type: [Skills],
  })
  @ApiResponse({
    status: 404,
    description: 'Kurs ID noto‘g‘ri yoki ko‘nikmalar topilmadi.',
  })
  async findByCourseId(@Param('courseId') courseId: string): Promise<Skills[]> {
    return this.skillsService.findByCourseId(courseId);
  }
}
