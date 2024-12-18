import { Module } from '@nestjs/common';
import { CourseModuleService } from './course-modules.service';
import { CourseModuleController } from './course-modules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourseModule,
  CourseModuleSchema,
} from './entities/course-module.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseModule.name, schema: CourseModuleSchema },
    ]),
  ],
  controllers: [CourseModuleController],
  providers: [CourseModuleService],
})
export class CourseModulesModule {}
