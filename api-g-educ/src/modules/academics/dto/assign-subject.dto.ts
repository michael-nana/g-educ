
import {
  IsInt,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class AssignSubjectDto {
  @IsUUID()
  subjectId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  coefficient?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;
}
