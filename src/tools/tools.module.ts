import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tools, ToolsSchema } from './entities/tool.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tools.name, schema: ToolsSchema }]),
  ],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
