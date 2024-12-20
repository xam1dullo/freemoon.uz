import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillsDto } from './create-skill.dto';

export class UpdateSkillsDto extends PartialType(CreateSkillsDto) {}
