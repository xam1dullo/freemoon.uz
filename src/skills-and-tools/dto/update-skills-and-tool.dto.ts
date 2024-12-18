import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillsAndToolsDto } from './create-skills-and-tool.dto';

export class UpdateSkillsAndToolDto extends PartialType(
  CreateSkillsAndToolsDto,
) {}
