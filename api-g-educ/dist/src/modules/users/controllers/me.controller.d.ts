import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { Role } from '../../../generated/prisma/client';
import { UsersService } from '../services/users.service';
import { AnonymizationService } from '../services/anonymization.service';
import { ClassChangeRequestsService } from '../services/class-change-requests.service';
import { UpdateMyProfileDto } from '../dto/update-my-profile.dto';
import { ChangeMyPasswordDto } from '../dto/change-my-password.dto';
import { CreateClassChangeRequestDto } from '../dto/create-class-change-request.dto';
export declare class MeController {
    private readonly usersService;
    private readonly anonymizationService;
    private readonly classChangeRequestsService;
    constructor(usersService: UsersService, anonymizationService: AnonymizationService, classChangeRequestsService: ClassChangeRequestsService);
    getMe(user: AuthenticatedUser): Promise<{
        id: string;
        createdAt: Date;
        phone: string;
        role: Role;
        status: import("../../../generated/prisma/enums").UserStatus;
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
    updateProfile(user: AuthenticatedUser, dto: UpdateMyProfileDto): Promise<{
        id: string;
        classId: string;
        updatedAt: Date;
        displayName: string;
        schoolName: string | null;
        academicYearId: string;
    }>;
    changePassword(user: AuthenticatedUser, dto: ChangeMyPasswordDto): Promise<{
        message: string;
    }>;
    createClassChangeRequest(user: AuthenticatedUser, dto: CreateClassChangeRequestDto): Promise<{
        id: string;
        createdAt: Date;
        status: import("../../../generated/prisma/enums").RequestStatus;
        academicYearId: string;
        fromClassId: string;
        toClassId: string;
        note: string | null;
    }>;
    anonymize(user: AuthenticatedUser): Promise<{
        message: string;
    }>;
}
