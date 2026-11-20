import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsEnum,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateQuestionDto } from './create-question.dto';
import { ExerciseFormat } from '../../../generated/prisma/client';

export class CreateAssessmentDto {
  @IsOptional()
  @IsEnum(ExerciseFormat)
  exerciseFormat?: ExerciseFormat;

  @IsString()
  @MinLength(2)
  title!: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationSeconds?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  passingPercent?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100000)
  position?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
