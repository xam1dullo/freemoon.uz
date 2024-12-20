import { Module as NestModule } from '@nestjs/common';
import { ModulesService } from './module.service';
import { ModulesController } from './module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModuleSchema, CourseModule } from './entities/module.entity';
import { Course, CourseSchema } from 'src/courses/entities/courses.entity';
import { CoursesModule } from 'src/courses/courses.module';

@NestModule({
  imports: [
    MongooseModule.forFeature([
      { name: CourseModule.name, schema: CourseModuleSchema },
      { name: Course.name, schema: CourseSchema }, // Bu qator qo'shilishi kerak
    ]),
    CoursesModule,
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModuleModule {}
