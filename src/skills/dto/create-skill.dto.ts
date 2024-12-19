import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateSkillsDto {
  @ApiProperty({
    description: 'Kategoriya nomi',
    example: 'Dasturlash tillari',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: "Ko'nikmalar ro'yxati",
    example: ['JavaScript', 'TypeScript', 'Node.js'],
  })
  @IsArray()
  @IsNotEmpty()
  items: string[];
}
