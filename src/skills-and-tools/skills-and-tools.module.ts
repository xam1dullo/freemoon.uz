import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsAndToolsService } from './skills-and-tools.service';
import { SkillsAndToolsController } from './skills-and-tools.controller';
import {
  SkillsAndToolsSchema,
  SkillsAndTools,
} from './entities/skills-and-tool.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkillsAndTools.name, schema: SkillsAndToolsSchema },
    ]),
  ],
  controllers: [SkillsAndToolsController],
  providers: [SkillsAndToolsService],
})
export class SkillsAndToolsModule {}
