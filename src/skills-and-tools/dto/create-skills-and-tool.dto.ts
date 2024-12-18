import { IsArray, IsString } from 'class-validator';

export class CreateSkillsAndToolsDto {
  @IsArray()
  @IsString({ each: true }) // Har bir array elementi string bo'lishi kerak
  skills: string[];

  @IsArray()
  @IsString({ each: true })
  tools: string[];
}
