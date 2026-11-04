import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
export declare class AnonymizationService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    anonymize(user: AuthenticatedUser): Promise<{
        message: string;
    }>;
}
