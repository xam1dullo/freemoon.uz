import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

export type MentorDocument = Mentor & Document;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Mentor {
  @Prop({ required: true, trim: true, index: true })
  full_name: string; // Mentor's full name

  @Prop({ required: true, trim: true })
  profession: string; // Mentor's profession or position

  @Prop({ trim: true })
  description: string; // Short biography of the mentor

  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
    index: true,
  })
  category: Types.ObjectId; // Reference to a category

  @Prop({ trim: true })
  image_url: string; // URL of the mentor's image
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);

// Optional: If you want to handle indexes globally here
// MentorSchema.index({ full_name: 1 });
// MentorSchema.index({ category: 1 });

// Example of pre-save middleware if needed
// MentorSchema.pre('save', function(next) {
//   // Do something before saving
//   next();
// });
