
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { SubmitAnswerDto } from './submit-answer.dto';

export class SubmitAttemptDto {
  @IsUUID()
  clientId!: string;

  @IsDateString()
  startedAt!: string;



  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  answers!: SubmitAnswerDto[];
}
