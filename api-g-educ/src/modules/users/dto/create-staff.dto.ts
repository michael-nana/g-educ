import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  IsUUID,
} from 'class-validator';
import { Role } from '../../../generated/prisma/client';

export class CreateStaffDto {
  @IsString()
  @Matches(/^\+226\d{8}$/)
  phone!: string;

  @IsEnum(Role)
  role!: Role;

  @IsOptional()
  @IsBoolean()
  canPublish?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  classSubjectIds?: string[];
}