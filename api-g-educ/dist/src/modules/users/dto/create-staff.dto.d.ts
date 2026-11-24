import { Role } from '../../../generated/prisma/client';
export declare class CreateStaffDto {
    phone: string;
    role: Role;
    canPublish?: boolean;
    classSubjectIds?: string[];
}
