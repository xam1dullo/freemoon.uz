import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseModuleDocument = CourseModule & Document;

@Schema()
export class Topic {
  @Prop({ required: true })
  topic_number: number; // Mavzu tartib raqami

  @Prop({ required: true })
  title: string; // Mavzu nomi
}

@Schema()
export class CourseModule {
  @Prop({ required: true })
  module_number: number; // Modul tartib raqami

  @Prop({ required: true })
  module_title: string; // Modul sarlavhasi

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true }) // Kurs bilan bog'lanish
  course: Types.ObjectId;

  @Prop({ type: [Topic], default: [] })
  topics: Topic[]; // Mavzular ro'yxati
}

export const CourseModuleSchema = SchemaFactory.createForClass(CourseModule);
