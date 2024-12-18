import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SkillsAndToolsDocument = SkillsAndTools & Document;

@Schema()
export class SkillsAndTools {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true }) // Kurs bilan bog'lanish
  course: Types.ObjectId;

  @Prop({ required: true, type: [String] })
  skills: string[]; // Ko'nikmalar ro'yxati

  @Prop({ required: true, type: [String] })
  tools: string[]; // Asboblar ro'yxati

  @Prop({ default: Date.now })
  created_at: Date; // Yaratilgan sana

  @Prop({ default: Date.now })
  updated_at: Date; // Oxirgi yangilangan sana
}

export const SkillsAndToolsSchema =
  SchemaFactory.createForClass(SkillsAndTools);

// Hook: updated_at ni avtomatik yangilash
SkillsAndToolsSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});
