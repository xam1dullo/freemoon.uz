import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateMentorDto {
  @ApiProperty({ description: 'Mentorning to‘liq ismi', example: 'John Doe' })
  @IsString()
  readonly full_name: string;

  @ApiProperty({
    description: 'Mentorning professioni',
    example: 'Senior Backend Developer',
  })
  @IsString()
  readonly profession: string;

  @ApiProperty({
    description: 'Mentor haqida tavsif',
    example: '10 yillik tajribaga ega backend dasturchi',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Mentorning rasmi URL manzili',
    example: 'https://example.com/images/mentor.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly image_url?: string;
}
