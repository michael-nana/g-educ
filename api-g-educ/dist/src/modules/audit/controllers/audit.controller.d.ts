import { AuditService } from '../services/audit.service';
import { AuditQueryDto } from '../dto/audit-query.dto';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findAll(filters: AuditQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            userId: string | null;
            role: import("../../../generated/prisma/enums").Role | null;
            action: string;
            entityType: string;
            entityId: string | null;
            before: import("@prisma/client/runtime/client").JsonValue | null;
            after: import("@prisma/client/runtime/client").JsonValue | null;
            ipAddress: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
