import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Kursning sarlavhasi',
    example: 'Frontend Development',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Kurs tavsifi',
    example: 'Learn HTML, CSS, and JavaScript.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Mentorning ismi', example: 'John Doe' })
  @IsString()
  @IsOptional()
  mentor_name?: string;

  @ApiProperty({
    description: "Mentor haqida ma'lumot",
    example: 'Senior Frontend Developer',
  })
  @IsString()
  @IsOptional()
  mentor_info?: string;

  @ApiProperty({
    description: 'Mentorning rasmi URL manzili',
    example: 'https://example.com/mentor.jpg',
  })
  @IsString()
  @IsOptional()
  mentor_image?: string;

  @ApiProperty({
    description: 'Mentorning MongoDB ObjectId',
    example: '63a5f8e2c23e2b0c888b4567',
  })
  @IsMongoId()
  @IsNotEmpty()
  mentor: string;

  @ApiProperty({ description: 'Kurs narxi', example: 199.99 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Kurs modullari',
    example: [{ name: 'Introduction', duration: '10min' }],
  })
  modules: any[];
}
