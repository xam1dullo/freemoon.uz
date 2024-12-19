import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ToolsDocument = Tools & Document;

@Schema()
export class Tools {
  @Prop({ required: true })
  category: string; // Asboblar kategoriyasi (masalan: "Asboblar")

  @Prop({ type: [{ name: String, icon: String }], required: true })
  items: { name: string; icon: string }[]; // Har bir asbobning nomi va ikonkasi

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const ToolsSchema = SchemaFactory.createForClass(Tools);

// Hook: updated_at ni avtomatik yangilash
ToolsSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});
