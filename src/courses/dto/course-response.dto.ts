import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class CourseResponseDto {
  @ApiProperty({
    description: 'Kursning MongoDB ObjectId',
    example: '63a5f8e2c23e2b0c888b4567',
  })
  id: string;

  @ApiProperty({
    description: 'Kursning sarlavhasi',
    example: 'Frontend Development',
  })
  title: string;

  @ApiProperty({
    description: 'Kurs tavsifi',
    example: 'Learn HTML, CSS, and JavaScript.',
  })
  description?: string;

  @ApiProperty({ description: 'Mentorning ismi', example: 'John Doe' })
  mentor_name?: string;

  @ApiProperty({
    description: "Mentor haqida ma'lumot",
    example: 'Senior Frontend Developer',
  })
  mentor_info?: string;

  @ApiProperty({
    description: 'Mentorning rasmi URL manzili',
    example: 'https://example.com/mentor.jpg',
  })
  mentor_image?: string;

  @ApiProperty({
    description: 'Mentorning MongoDB ObjectId',
    example: '63a5f8e2c23e2b0c888b4567',
  })
  mentor: string;

  @ApiProperty({ description: 'Kurs narxi', example: 199.99 })
  price: number;

  @ApiProperty({
    description: 'Kurs yaratilgan sana',
    example: '2024-12-19T08:00:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Kurs yangilangan sana',
    example: '2024-12-19T09:00:00.000Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Kurs modullari',
    example: [{ name: 'Introduction', duration: '10min' }],
  })
  @IsArray()
  @IsOptional()
  modules?: any[];
}
