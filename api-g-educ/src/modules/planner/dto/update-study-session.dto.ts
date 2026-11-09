
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
  Matches,
  ValidateIf,
} from 'class-validator';

import { Recurrence } from '../../../generated/prisma/client';

export class UpdateStudySessionDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ValidateIf(
    (_object, value) => value !== undefined && value !== null,
  )
  @IsUUID()
  subjectId?: string | null;

  @ValidateIf((_object, value) => value !== undefined)
  @IsDateString()
  startsAt?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsDateString()
  endsAt?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsEnum(Recurrence)
  recurrence?: Recurrence;

  @ValidateIf(
    (_object, value) => value !== undefined && value !== null,
  )
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  recurrenceEndsOn?: string | null;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(0)
  reminderMinutesBefore?: number;

  @ValidateIf(
    (_object, value) => value !== undefined && value !== null,
  )
  @IsDateString()
  completedAt?: string | null;
}
