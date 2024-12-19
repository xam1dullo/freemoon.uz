import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolsDto } from './dto/create-tool.dto';
import { Tools } from './entities/tool.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tools') // Swaggerda bo'limni belgilash
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @ApiOperation({ summary: 'Yangi asboblar qo‘shish' })
  @ApiResponse({
    status: 201,
    description: 'Asboblar muvaffaqiyatli yaratildi.',
  })
  @Post()
  async create(@Body() dto: CreateToolsDto): Promise<Tools> {
    return this.toolsService.create(dto);
  }

  @ApiOperation({ summary: 'Barcha asboblarni olish' })
  @ApiResponse({ status: 200, description: 'Asboblar muvaffaqiyatli olindi.' })
  @Get()
  async findAll(): Promise<Tools[]> {
    return this.toolsService.findAll();
  }

  @ApiOperation({ summary: 'Bitta asbobni olish' })
  @ApiResponse({ status: 200, description: 'Asbob muvaffaqiyatli topildi.' })
  @ApiResponse({ status: 404, description: 'Asbob topilmadi.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tools> {
    return this.toolsService.findOne(id);
  }

  @ApiOperation({ summary: 'Asboblarni yangilash' })
  @ApiResponse({ status: 200, description: 'Asbob muvaffaqiyatli yangilandi.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateToolsDto,
  ): Promise<Tools> {
    return this.toolsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Asboblarni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Asbob muvaffaqiyatli o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Asbob topilmadi.' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.toolsService.delete(id);
  }
}
