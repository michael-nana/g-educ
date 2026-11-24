import { EventType } from '../../../generated/prisma/client';
export declare class EventFilterDto {
    from?: string;
    to?: string;
    type?: EventType;
    subjectId?: string;
}
