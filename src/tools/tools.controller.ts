// src/tools/tools.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Tools } from './entities/tool.entity';
import { CreateToolsDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@ApiTags('tools') // Controller tagi
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi asbob yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Asbob muvaffaqiyatli yaratildi.',
    type: Tools,
  })
  @ApiResponse({ status: 400, description: 'Xatolik yuz berdi.' })
  async create(@Body() createToolsDto: CreateToolsDto): Promise<Tools> {
    return this.toolsService.create(createToolsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha asboblarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli olindi.',
    type: [Tools],
  })
  async findAll(): Promise<Tools[]> {
    return this.toolsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta asbobni ID bo‘yicha olish' })
  @ApiParam({ name: 'id', description: 'Asbob ID si' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli olindi.',
    type: Tools,
  })
  @ApiResponse({ status: 404, description: 'Asbob topilmadi.' })
  async findOne(@Param('id') id: string): Promise<Tools> {
    return this.toolsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Asbobni yangilash' })
  @ApiParam({ name: 'id', description: 'Asbob ID si' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli yangilandi.',
    type: Tools,
  })
  @ApiResponse({ status: 404, description: 'Asbob topilmadi.' })
  async update(
    @Param('id') id: string,
    @Body() updateToolsDto: UpdateToolDto,
  ): Promise<Tools> {
    return this.toolsService.update(id, updateToolsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Asbobni o‘chirish' })
  @ApiParam({ name: 'id', description: 'Asbob ID si' })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli o‘chirildi.',
    type: Tools,
  })
  @ApiResponse({ status: 404, description: 'Asbob topilmadi.' })
  async remove(@Param('id') id: string): Promise<Tools> {
    return this.toolsService.remove(id);
  }
}
