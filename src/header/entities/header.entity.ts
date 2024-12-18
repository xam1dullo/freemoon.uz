import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HeaderDocument = HydratedDocument<Header>;

@Schema()
export class Header {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  buttunText: string;

  @Prop()
  buttunLink: string;
}

export const HeaderSchema = SchemaFactory.createForClass(Header);
