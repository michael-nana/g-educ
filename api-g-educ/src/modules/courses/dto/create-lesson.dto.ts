
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

import { LessonType } from '../../../generated/prisma/client';

export class CreateLessonDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsEnum(LessonType)
  type!: LessonType;

  @IsOptional()
  @IsString()
  contentMarkdown?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100000)
  position?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationSeconds?: number;
}
