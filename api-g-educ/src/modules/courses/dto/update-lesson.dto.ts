
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

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