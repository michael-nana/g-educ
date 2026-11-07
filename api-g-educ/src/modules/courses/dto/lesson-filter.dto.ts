
import {
  IsBooleanString,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { LessonType } from '../../../generated/prisma/client';

export class LessonFilterDto {
  @IsOptional()
  @IsUUID()
  chapterId?: string;

  @IsOptional()
  @IsUUID()
  classSubjectId?: string;

  @IsOptional()
  @IsEnum(LessonType)
  type?: LessonType;

  @IsOptional()
  @IsBooleanString()
  favorite?: string;
}
