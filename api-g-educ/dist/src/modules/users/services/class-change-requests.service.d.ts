import { RequestStatus } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { CreateClassChangeRequestDto } from '../dto/create-class-change-request.dto';
import { ReviewClassChangeRequestDto } from '../dto/review-class-change-request.dto';
export declare class ClassChangeRequestsService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    create(user: AuthenticatedUser, dto: CreateClassChangeRequestDto): Promise<{
        id: string;
        createdAt: Date;
        status: RequestStatus;
        academicYearId: string;
        fromClassId: string;
        toClassId: string;
        note: string | null;
    }>;
    list(): Promise<{
        id: string;
        createdAt: Date;
        status: RequestStatus;
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
        status: RequestStatus;
        reviewedById: string | null;
        reviewedAt: Date | null;
        note: string | null;
    }>;
    reject(admin: AuthenticatedUser, id: string, dto: ReviewClassChangeRequestDto): Promise<{
        id: string;
        status: RequestStatus;
        reviewedById: string | null;
        reviewedAt: Date | null;
        note: string | null;
    }>;
    private review;
}
