import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class CreateLessonDto {
  @ApiProperty({ description: 'Lesson title', example: 'Introduction to HTML' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Lesson content',
    example: 'Basic HTML tags and structure',
    required: false,
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'Lesson video URL',
    example: 'https://example.com/video.mp4',
    required: false,
  })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    description: 'Duration of the lesson in minutes',
    example: 30,
    required: false,
  })
  @IsOptional()
  duration?: number;
}

export class CreateModuleDto {
  @ApiProperty({ description: 'Module title', example: '1-modul' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'ID of the course this module belongs to',
    example: '60c72b2f9e1d4d5c5c4a6d93',
  })
  @IsString()
  @IsNotEmpty()
  course: string;

  @ApiProperty({
    description: 'Description of the module',
    example: 'In this module, you will learn HTML basics.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'List of lessons in this module',
    type: [CreateLessonDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonDto)
  @IsOptional()
  lessons?: CreateLessonDto[];
}
