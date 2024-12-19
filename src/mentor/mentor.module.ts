import { forwardRef, Module } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorController } from './mentor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mentor, MentorSchema } from './entities/mentor.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mentor.name, schema: MentorSchema }]),
    forwardRef(() => CoursesModule),
    CategoryModule,
  ],
  controllers: [MentorController],
  providers: [MentorService],
  exports: [MentorService], // Xizmatni eksport qilish
})
export class MentorModule {}
