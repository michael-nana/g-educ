import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { ClassChangeRequestsService } from '../services/class-change-requests.service';
import { ReviewClassChangeRequestDto } from '../dto/review-class-change-request.dto';
export declare class ClassChangeRequestsController {
    private readonly service;
    constructor(service: ClassChangeRequestsService);
    list(): Promise<{
        id: string;
        createdAt: Date;
        status: import("../../../generated/prisma/enums").RequestStatus;
        academicYearId: string;
        studentProfileId: string;
        fromClassId: string;
        toClassId: string;
        reviewedById: string | null;
        reviewedAt: Date | null;
        note: string | null;
    }[]>;
    approve(admin: AuthenticatedUser, id: string, dto: ReviewClassChangeRequestDto): Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").RequestStatus;
        reviewedById: string | null;
        reviewedAt: Date | null;
        note: string | null;
    }>;
    reject(admin: AuthenticatedUser, id: string, dto: ReviewClassChangeRequestDto): Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").RequestStatus;
        reviewedById: string | null;
        reviewedAt: Date | null;
        note: string | null;
    }>;
}
