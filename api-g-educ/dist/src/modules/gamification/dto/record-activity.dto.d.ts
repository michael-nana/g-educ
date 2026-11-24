import { ActivityRefType, ActivityType } from '../../../generated/prisma/client';
export declare class RecordActivityDto {
    clientId: string;
    type: ActivityType;
    refType: ActivityRefType;
    refId: string;
    occurredAt: string;
}
