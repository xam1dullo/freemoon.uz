import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema()
export class Content {
  @Prop({ required: true })
  mentor_name: string;

  @Prop({ required: true })
  profession: string;

  @Prop()
  mentor_description: string;

  @Prop()
  mentor_image_url: string;

  // Kurs Narxi Ma'lumotlari
  @Prop({ required: true })
  price: number;

  @Prop()
  old_price: number;

  @Prop()
  discount_percentage: number;

  @Prop({ required: true })
  cta_text: string;

  @Prop()
  cta_url: string;

  // Yaratilgan vaqti
  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
