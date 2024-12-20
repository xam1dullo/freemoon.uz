import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skills, SkillsSchema } from './entities/skill.entity';
import { Course, CourseSchema } from 'src/courses/entities/courses.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Skills.name, schema: SkillsSchema },
      { name: Course.name, schema: CourseSchema }, // Agar Course bilan bog'liq bo'lsa
    ]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
