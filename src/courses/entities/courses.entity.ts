import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  mentor_name: string;

  @Prop()
  mentor_info: string;

  @Prop()
  mentor_image: string;

  @Prop({ type: Types.ObjectId, ref: 'Mentor', required: true }) // Mentor bilan bog'lanish
  mentor: Types.ObjectId;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
