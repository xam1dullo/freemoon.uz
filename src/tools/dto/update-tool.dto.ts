import { PartialType } from '@nestjs/mapped-types';
import { CreateToolsDto } from './create-tool.dto';

export class UpdateToolDto extends PartialType(CreateToolsDto) {}
