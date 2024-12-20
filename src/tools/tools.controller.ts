import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolsDto } from './dto/create-tool.dto';
import { Tools } from './entities/tool.entity';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @ApiOperation({
    summary: 'Barcha toollarni filter, search va pagination bilan olish',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, description: "Qidirish so'z" })
  @ApiQuery({
    name: 'category',
    required: false,
    description: "Kategoriya bo'yicha filter",
  })
  @ApiResponse({
    status: 200,
    description: 'Tools muvaffaqiyatli olindi.',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/Tools' } },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
      },
    },
  })
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ): Promise<{ data: Tools[]; total: number; page: number; limit: number }> {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    return this.toolsService.findAll(pageNumber, limitNumber, search, category);
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
