import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'Kategoriya ID',
    example: '63a5f8e2c23e2b0c888b4567',
  })
  id: string;

  @ApiProperty({ description: 'Kategoriya nomi', example: 'Programming' })
  name: string;

  @ApiProperty({
    description: 'Kategoriya yaratilgan sana',
    example: '2024-12-19T09:00:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Kategoriya yangilangan sana',
    example: '2024-12-19T09:30:00.000Z',
  })
  updated_at: Date;
}
