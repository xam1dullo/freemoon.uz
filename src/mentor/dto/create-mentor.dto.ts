import { IsString, IsOptional } from 'class-validator';

export class CreateMentorDto {
  @IsString()
  readonly full_name: string;

  @IsString()
  readonly profession: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly image_url?: string;
}
