

import {
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class UpdateLessonProgressDto {
  @IsInt()
  @Min(0)
  @Max(100)
  progressPercent!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  lastPositionSeconds?: number;

  @IsUUID()
  clientId!: string;
}
