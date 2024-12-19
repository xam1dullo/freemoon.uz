import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillsDto } from './dto/create-skill.dto';
import { Skills } from './entities/skill.entity';

@ApiTags('Skills') // Swagger bo'limi nomi
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({ summary: 'Yangi ko‘nikma qo‘shish' })
  @ApiResponse({
    status: 201,
    description: 'Ko‘nikma muvaffaqiyatli yaratildi.',
    type: Skills,
  })
  @Post()
  async create(@Body() dto: CreateSkillsDto): Promise<Skills> {
    return this.skillsService.create(dto);
  }

  @ApiOperation({ summary: 'Barcha ko‘nikmalarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Ko‘nikmalar ro‘yxati muvaffaqiyatli olindi.',
    type: [Skills],
  })
  @Get()
  async findAll(): Promise<Skills[]> {
    return this.skillsService.findAll();
  }

  @ApiOperation({ summary: 'ID bo‘yicha ko‘nikmani olish' })
  @ApiResponse({
    status: 200,
    description: 'Ko‘nikma muvaffaqiyatli topildi.',
    type: Skills,
  })
  @ApiResponse({ status: 404, description: 'Ko‘nikma topilmadi.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Skills> {
    return this.skillsService.findOne(id);
  }

  @ApiOperation({ summary: 'ID bo‘yicha ko‘nikmani yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Ko‘nikma muvaffaqiyatli yangilandi.',
    type: Skills,
  })
  @ApiResponse({ status: 404, description: 'Ko‘nikma topilmadi.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateSkillsDto,
  ): Promise<Skills> {
    return this.skillsService.update(id, dto);
  }

  @ApiOperation({ summary: 'ID bo‘yicha ko‘nikmani o‘chirish' })
  @ApiResponse({
    status: 200,
    description: 'Ko‘nikma muvaffaqiyatli o‘chirildi.',
  })
  @ApiResponse({ status: 404, description: 'Ko‘nikma topilmadi.' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.skillsService.delete(id);
  }
}
