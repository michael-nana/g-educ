
import { IsDateString, IsEnum, IsUUID } from 'class-validator';
import { ActivityRefType, ActivityType } from '../../../generated/prisma/client';

export class RecordActivityDto {
  @IsUUID()
  clientId!: string;

  @IsEnum(ActivityType)
  type!: ActivityType;

  @IsEnum(ActivityRefType)
  refType!: ActivityRefType;

  @IsUUID()
  refId!: string;

  @IsDateString()
  occurredAt!: string;
}
