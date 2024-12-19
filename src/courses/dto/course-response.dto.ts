import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiProperty({
    description: 'Kurs ID-si',
    example: '60c72b2f9f1b2c001f0e4abe',
  })
  _id: string;

  @ApiProperty({ description: 'Kurs nomi', example: 'Node.js Developer' })
  title: string;

  @ApiProperty({
    description: 'Kurs tavsifi',
    example: 'Node.js asoslari va amaliy mashqlar',
  })
  description?: string;

  @ApiProperty({
    description: 'Mentor ID-si',
    example: '60c72b2f9f1b2c001f0e4abc',
  })
  mentor: string;

  @ApiProperty({ description: 'Kurs narxi', example: 100000 })
  price: number;

  @ApiProperty({
    description: 'Kategoriya ID-si',
    example: '60c72b2f9f1b2c001f0e4abd',
  })
  category: string;

  @ApiProperty({ description: 'Yaratilgan vaqt' })
  createdAt: Date;

  @ApiProperty({ description: 'Yangilangan vaqt' })
  updatedAt: Date;
}
