// src/tools/dto/create-tools.dto.ts

import { IsOptional, IsString, IsMongoId, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateToolsDto {
  @ApiPropertyOptional({
    description: "Asboblar kategoriyasi (masalan: 'Asboblar')",
    example: 'Development Tools',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Har bir asbobning nomi va ikonkasi',
    example: {
      name: 'Visual Studio Code',
      icon: 'http://google.com/vscode-icon.png',
    },
  })
  @IsObject()
  items: { name: string; icon: string };

  @ApiProperty({
    description: 'Kurs ID',
    example: '64b3c3c4f1a6a30a3c3a6a1a',
  })
  @IsMongoId()
  courseId: string;
}
