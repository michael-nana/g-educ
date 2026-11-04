import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ReviewClassChangeRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}