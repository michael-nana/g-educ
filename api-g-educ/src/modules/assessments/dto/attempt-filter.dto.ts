import { IsOptional, IsUUID } from 'class-validator';

export class AttemptFilterDto {
  @IsOptional()
  @IsUUID()
  assessmentId?: string;
}