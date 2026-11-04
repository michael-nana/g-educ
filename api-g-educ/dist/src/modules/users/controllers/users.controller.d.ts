import { Role } from '../../../generated/prisma/client';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { UsersService } from '../services/users.service';
import { StaffService } from '../services/staff.service';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ListUsersDto } from '../dto/list-users.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly staffService;
    constructor(usersService: UsersService, staffService: StaffService);
    createStaff(dto: CreateStaffDto): Promise<{
        user: {
            id: string;
            createdAt: Date;
            phone: string;
            role: Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            canPublish: boolean;
            mustChangePassword: boolean;
        };
        temporaryPassword: string;
        message: string;
    }>;
    list(dto: ListUsersDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            phone: string;
            role: Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            canPublish: boolean;
            mustChangePassword: boolean;
            lastLoginAt: Date | null;
            studentProfile: {
                classId: string;
                displayName: string;
                schoolName: string | null;
            } | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        phone: string;
        role: Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        canPublish: boolean;
        mustChangePassword: boolean;
        phoneVerifiedAt: Date | null;
        lastLoginAt: Date | null;
        updatedAt: Date;
        studentProfile: {
            id: string;
            classId: string;
            displayName: string;
            schoolName: string | null;
            academicYearId: string;
        } | null;
        teacherAssignments: {
            id: string;
            classSubjectId: string;
        }[];
    }>;
    update(admin: AuthenticatedUser, id: string, dto: UpdateUserDto): Promise<{
        id: string;
        phone: string;
        role: Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        canPublish: boolean;
    }>;
    suspend(admin: AuthenticatedUser, id: string): Promise<{
        id: string;
        role: Role;
        status: import("../../../generated/prisma/enums").UserStatus;
    }>;
    reactivate(admin: AuthenticatedUser, id: string): Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").UserStatus;
    }>;
}
