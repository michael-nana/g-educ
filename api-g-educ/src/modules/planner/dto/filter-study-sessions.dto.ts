
import { IsDateString, IsOptional } from 'class-validator';

export class FilterStudySessionsDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsDateString()
  updatedSince?: string;
}
