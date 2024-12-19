import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ToolItemDto {
  @ApiProperty({ description: 'Asbob nomi' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Asbobning ikon URL manzili' })
  @IsString()
  readonly icon: string;
}

export class CreateToolsDto {
  @ApiProperty({ description: 'Asboblar kategoriyasi', example: 'Asboblar' })
  @IsString()
  readonly category: string;

  @ApiProperty({
    description: 'Asboblar roʻyxati',
    type: [ToolItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ToolItemDto)
  readonly items: ToolItemDto[];
}
