import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: 'Kurs nomi', example: 'Node.js Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Kurs tavsifi',
    example: 'Node.js asoslari va amaliy mashqlar',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Mentor ID-si',
    example: '60c72b2f9f1b2c001f0e4abc',
  })
  @IsString()
  @IsNotEmpty()
  mentor: string;

  @ApiProperty({ description: 'Kurs narxi', example: 100000 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Kategoriya ID-si',
    example: '60c72b2f9f1b2c001f0e4abd',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
