// src/skills/dto/create-skills.dto.ts

import {
  IsOptional,
  IsString,
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSkillsDto {
  @ApiPropertyOptional({
    description: "Kategoriya nomi (masalan: 'Ko'nikmalar')",
    example: 'Programming Languages',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: "Har bir kategoriya uchun ko'nikmalar ro'yxati",
    example: 'JavaScript',
    type: String,
  })
  @IsString()
  items: string;

  @ApiProperty({
    description: 'Kurs ID',
    example: '64b3c3c4f1a6a30a3c3a6a1a',
  })
  @IsMongoId()
  courseId: string;
}

export class CreateSkillItemDto {
  @ApiProperty({
    description: "Qo'shiladigan ko'nikma nomi",
    example: 'Python',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
