import { PrismaService } from '../../../prisma/prisma.service';
import { ClsContextService } from '../../../common/cls/cls-context.service';
import type { AuditQueryDto } from '../dto/audit-query.dto';
import type { Prisma } from '../../../generated/prisma/client';
export interface CreateAuditLogInput {
    action: string;
    entityType: string;
    entityId?: string | null;
    before?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
    after?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
export declare class AuditService {
    private readonly prisma;
    private readonly clsContext;
    constructor(prisma: PrismaService, clsContext: ClsContextService);
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
    log(input: CreateAuditLogInput, tx?: Prisma.TransactionClient): Promise<{
        id: bigint;
        createdAt: Date;
        userId: string | null;
        role: import("../../../generated/prisma/enums").Role | null;
        action: string;
        entityType: string;
        entityId: string | null;
        before: import("@prisma/client/runtime/client").JsonValue | null;
        after: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
    }>;
}
