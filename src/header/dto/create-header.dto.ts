import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHeaderDto {
  @ApiProperty({ description: 'Sarlavha nomi', example: 'Welcome Header' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Sarlavha Image',
    example: 'http://google.com/image',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Sarlavha buttun text',
    example: 'more',
  })
  @IsString()
  buttunText: string;

  @ApiProperty({
    description: 'Sarlavha buttun uchun link',
    example: 't.me/@thelazy_programmer',
  })
  @IsString()
  buttunLink: string;
}
