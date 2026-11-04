import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../../generated/prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsBoolean()
  canPublish?: boolean;
}