import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillsDocument = Skills & Document;

@Schema({ timestamps: true })
export class Skills {
  @Prop({ required: true })
  category: string; // Kategoriya (masalan: "Ko'nikmalar")

  @Prop({ type: [String], required: true })
  items: string[]; // Har bir kategoriya uchun ko'nikmalar ro'yxati
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
