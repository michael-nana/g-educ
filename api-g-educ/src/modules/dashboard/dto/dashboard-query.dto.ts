import { Type } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export class DashboardQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsIn([14, 30, 365])
  period?: number;
}
