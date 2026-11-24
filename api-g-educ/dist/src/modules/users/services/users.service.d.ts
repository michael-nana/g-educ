import { Role, UserStatus } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { AuthService } from '../../auth/services/auth.service';
import { UpdateMyProfileDto } from '../dto/update-my-profile.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ListUsersDto } from '../dto/list-users.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly audit;
    private readonly authService;
    constructor(prisma: PrismaService, audit: AuditService, authService: AuthService);
    getMe(user: AuthenticatedUser): Promise<{
        id: string;
        createdAt: Date;
        phone: string;
        role: Role;
        status: UserStatus;
        canPublish: boolean;
        mustChangePassword: boolean;
        phoneVerifiedAt: Date | null;
        lastLoginAt: Date | null;
        studentProfile: {
            id: string;
            classId: string;
            displayName: string;
            schoolName: string | null;
            academicYearId: string;
        } | null;
    }>;
    updateMyProfile(user: AuthenticatedUser, dto: UpdateMyProfileDto): Promise<{
        id: string;
        classId: string;
        updatedAt: Date;
        displayName: string;
        schoolName: string | null;
        academicYearId: string;
    }>;
    changePassword(user: AuthenticatedUser, dto: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    list(dto: ListUsersDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            phone: string;
            role: Role;
            status: UserStatus;
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
        status: UserStatus;
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
    updateUser(admin: AuthenticatedUser, id: string, dto: UpdateUserDto): Promise<{
        id: string;
        phone: string;
        role: Role;
        status: UserStatus;
        canPublish: boolean;
    }>;
    suspend(admin: AuthenticatedUser, id: string): Promise<{
        id: string;
        role: Role;
        status: UserStatus;
    }>;
    reactivate(_admin: AuthenticatedUser, id: string): Promise<{
        id: string;
        status: UserStatus;
    }>;
    private assertNotLastActiveAdmin;
}
