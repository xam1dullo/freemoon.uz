import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ToolsDocument = Tools & Document;

@Schema({ timestamps: true })
export class Tools {
  @Prop({ required: false }) // Ixtiyoriy qilish
  category?: string; // Asboblar kategoriyasi (masalan: "Asboblar")

  @Prop({ type: [{ name: String, icon: String }], required: true })
  items: { name: string; icon: string }[]; // Har bir asbobning nomi va ikonkasi

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId; // Kurs ID

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const ToolsSchema = SchemaFactory.createForClass(Tools);
