import { IsOptional, IsUUID } from 'class-validator';

export class AssessmentFilterDto {
  @IsOptional()
  @IsUUID()
  chapterId?: string;
}