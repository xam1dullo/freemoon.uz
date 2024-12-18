import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { Upload, UploadSchema } from './entities/upload.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
  ],

  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
