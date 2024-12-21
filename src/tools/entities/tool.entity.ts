import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from 'src/courses/entities/courses.entity';

export type ToolsDocument = Tools & Document;

@Schema({ timestamps: true })
export class Tools {
  @Prop({ required: false }) // Ixtiyoriy qilish
  category?: string; // Asboblar kategoriyasi (masalan: "Asboblar")

  @Prop({ type: [{ name: String, icon: String }], required: true })
  items: { name: string; icon: string }[]; // Har bir asbobning nomi va ikonkasi

  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  courseId: Types.ObjectId; // Kurs ID
}

export const ToolsSchema = SchemaFactory.createForClass(Tools);
