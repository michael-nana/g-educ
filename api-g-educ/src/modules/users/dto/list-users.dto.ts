import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import {
  Role,
  UserStatus,
} from '../../../generated/prisma/client';

export class ListUsersDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Matches(/^\d+$/)
  page?: string;

  @IsOptional()
  @Matches(/^\d+$/)
  limit?: string;
}