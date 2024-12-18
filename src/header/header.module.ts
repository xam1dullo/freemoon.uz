import { Header, Module } from '@nestjs/common';
import { HeaderService } from './header.service';
import { HeaderController } from './header.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HeaderSchema } from './entities/header.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Header.name, schema: HeaderSchema }]),
  ],
  controllers: [HeaderController],
  providers: [HeaderService],
})
export class HeaderModule {}
