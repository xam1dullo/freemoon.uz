import { Module } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorController } from './mentor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mentor, MentorSchema } from './entities/mentor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mentor.name, schema: MentorSchema }]),
  ],
  controllers: [MentorController],
  providers: [MentorService],
  exports: [MentorService], // Xizmatni eksport qilish
})
export class MentorModule {}
