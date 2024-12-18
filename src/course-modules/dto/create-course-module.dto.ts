import { IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TopicDto {
  @IsNumber()
  readonly topic_number: number;

  @IsString()
  readonly title: string;
}

export class CreateCourseModuleDto {
  @IsNumber()
  readonly module_number: number;

  @IsString()
  readonly module_title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicDto)
  readonly topics: TopicDto[];
}
