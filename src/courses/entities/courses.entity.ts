import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Mentor } from 'src/mentor/entities/mentor.entity';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: Mentor.name, required: true, index: true })
  mentor: Types.ObjectId;

  @Prop({ default: 0 })
  price: number;

  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
    index: true,
  })
  category: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Optional: You can define indexes or add schema-level configuration here
// CourseSchema.index({ title: 1 });
// CourseSchema.index({ category: 1, mentor: 1 });
