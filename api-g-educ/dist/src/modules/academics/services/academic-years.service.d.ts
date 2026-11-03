import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import type { CreateAcademicYearDto } from '../dto/create-academic-year.dto';
export declare class AcademicYearsService {
    private readonly prisma;
    private readonly auditService;
    constructor(prisma: PrismaService, auditService: AuditService);
    findCurrent(): Promise<{
        id: string;
        label: string;
        startDate: Date;
        endDate: Date;
        isCurrent: boolean;
        createdAt: Date;
    }>;
    create(dto: CreateAcademicYearDto): Promise<{
        id: string;
        label: string;
        startDate: Date;
        endDate: Date;
        isCurrent: boolean;
        createdAt: Date;
    }>;
}
