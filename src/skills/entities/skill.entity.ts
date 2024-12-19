import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillsDocument = Skills & Document;

@Schema()
export class Skills {
  @Prop({ required: true })
  category: string; // Kategoriya (masalan: "Ko'nikmalar")

  @Prop({ type: [String], required: true })
  items: string[]; // Har bir kategoriya uchun ko'nikmalar ro'yxati

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);

// Hook: updated_at ni avtomatik yangilash
SkillsSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});
