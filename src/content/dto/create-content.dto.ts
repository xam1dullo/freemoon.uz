import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContentDto {
  // Mentor Ma'lumotlari
  @IsString()
  readonly mentor_name: string;

  @IsString()
  readonly profession: string;

  @IsString()
  @IsOptional()
  readonly mentor_description?: string;

  @IsString()
  @IsOptional()
  readonly mentor_image_url?: string;

  // Kurs Narxi Ma'lumotlari
  @IsNumber()
  readonly price: number;

  @IsNumber()
  @IsOptional()
  readonly old_price?: number;

  @IsNumber()
  @IsOptional()
  readonly discount_percentage?: number;

  @IsString()
  readonly cta_text: string;

  @IsString()
  @IsOptional()
  readonly cta_url?: string;
}
