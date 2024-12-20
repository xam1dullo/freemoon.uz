import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SkillsDocument = Skills & Document;

@Schema({ timestamps: true })
export class Skills {
  @Prop({ required: false }) // Ixtiyoriy maydon
  category?: string; // Kategoriya (masalan: "Ko'nikmalar")

  @Prop({ type: [String], required: true })
  items: string[]; // Har bir kategoriya uchun ko'nikmalar ro'yxati

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true }) // Yangi maydon
  courseId: Types.ObjectId; // Kurs ID
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
