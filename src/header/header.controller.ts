import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HeaderService } from './header.service';
import { CreateHeaderDto } from './dto/create-header.dto';
import { UpdateHeaderDto } from './dto/update-header.dto';
import { ImageKitService } from 'imagekit-nestjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('header')
export class HeaderController {
  constructor(
    private readonly headerService: HeaderService,
    private readonly imageKitService: ImageKitService,
  ) {}

  @Post()
  create(@Body() createHeaderDto: CreateHeaderDto) {
    return this.headerService.create(createHeaderDto);
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async imageUpload(@UploadedFile() file: Express.Multer.File) {
    const fileBase64 = file.buffer.toString('base64');

    const result = await this.imageKitService.upload({
      file: fileBase64,
      fileName: file.originalname,
    });
    return result.url;
  }

  @Get()
  findAll() {
    return this.headerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeaderDto: UpdateHeaderDto) {
    return this.headerService.update(+id, updateHeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headerService.remove(+id);
  }
}
