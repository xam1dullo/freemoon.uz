import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MentorDocument = Mentor & Document;

@Schema()
export class Mentor {
  @Prop({ required: true })
  full_name: string; // Mentorning to'liq ismi

  @Prop({ required: true })
  profession: string; // Kasbi yoki lavozimi

  @Prop()
  description: string; // Mentor haqida qisqa ma'lumot (bio)

  @Prop()
  image_url: string; // Rasm manzili uchun URL

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);
