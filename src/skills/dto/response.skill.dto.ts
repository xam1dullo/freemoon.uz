import { ApiProperty } from '@nestjs/swagger';

export class SkillsResponseDto {
  @ApiProperty({
    description: 'Hujjat ID-si',
    example: '60c72b2f9f1b2c001f0e4abc',
  })
  _id: string;

  @ApiProperty({
    description: 'Kategoriya nomi',
    example: 'Dasturlash tillari',
  })
  category: string;

  @ApiProperty({
    description: "Ko'nikmalar ro'yxati",
    example: ['JavaScript', 'TypeScript', 'Node.js'],
  })
  items: string[];

  @ApiProperty({ description: 'Hujjat yaratilgan vaqt' })
  createdAt: Date;

  @ApiProperty({ description: 'Hujjat yangilangan vaqt' })
  updatedAt: Date;
}
