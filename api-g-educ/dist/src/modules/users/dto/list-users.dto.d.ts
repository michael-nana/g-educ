import { Role, UserStatus } from '../../../generated/prisma/client';
export declare class ListUsersDto {
    role?: Role;
    status?: UserStatus;
    search?: string;
    page?: string;
    limit?: string;
}
