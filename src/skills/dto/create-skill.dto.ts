import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateSkillsDto {
  @ApiProperty({
    description: 'Kategoriya nomi',
    example: 'Programming Tools',
  })
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @ApiProperty({
    description: 'Kategoriya ichidagi elementlar ro‘yxati',
    example: ['JavaScript', 'TypeScript', 'Node.js', 'React'],
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  readonly items: string[];
}
