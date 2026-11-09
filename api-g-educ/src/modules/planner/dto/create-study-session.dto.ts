
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  Matches,
} from 'class-validator';

import { Recurrence } from '../../../generated/prisma/client';

export class CreateStudySessionDto {
  @IsUUID()
  clientId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsUUID()
  subjectId?: string;

  @IsDateString()
  startsAt!: string;

  @IsDateString()
  endsAt!: string;

  @IsOptional()
  @IsEnum(Recurrence)
  recurrence?: Recurrence;

  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  recurrenceEndsOn?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  reminderMinutesBefore?: number;
}
