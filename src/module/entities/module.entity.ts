import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from 'src/courses/entities/courses.entity';
import { ApiProperty } from '@nestjs/swagger';

class Lesson {
  @ApiProperty({ description: 'Lesson title', example: 'Introduction to HTML' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'Lesson description/content',
    example: 'You will learn basic HTML tags and structure',
  })
  @Prop()
  content?: string;

  @ApiProperty({
    description: 'Lesson video URL',
    example: 'https://example.com/video.mp4',
  })
  @Prop()
  videoUrl?: string;

  @ApiProperty({
    description: 'Duration of the lesson in minutes',
    example: 30,
  })
  @Prop()
  duration?: number;
}

@Schema({ timestamps: true })
export class CourseModule extends Document {
  @ApiProperty({ description: 'Module title', example: '1-modul' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'Which course this module belongs to',
    example: '60c72b2f9e1d4d5c5c4a6d93',
  })
  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  course: Types.ObjectId;

  @ApiProperty({
    description: 'Description of what will be learned in this module',
    example: 'In this module, you will learn HTML basics.',
  })
  @Prop()
  description?: string;

  @ApiProperty({
    description: 'List of lessons in this module',
    type: [Lesson],
  })
  @Prop({ type: [Lesson], default: [] })
  lessons: Lesson[];
}

export const CourseModuleSchema = SchemaFactory.createForClass(CourseModule);
