import { Injectable } from '@nestjs/common';

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

@Injectable()
export class AuditService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clsContext: ClsContextService,
  ) {}

  async findAll(filters: AuditQueryDto) {
  const {
    userId,
    entityType,
    entityId,
    action,
    from,
    to,
    page = 1,
    limit = 20,
  } = filters;

  const where: Prisma.AuditLogWhereInput = {
    ...(userId && { userId }),
    ...(entityType && { entityType }),
    ...(entityId && { entityId }),
    ...(action && { action }),
    ...(from || to
      ? {
          createdAt: {
            ...(from && { gte: new Date(from) }),
            ...(to && { lte: new Date(to) }),
          },
        }
      : {}),
  };

  const [data, total] = await this.prisma.$transaction([
    this.prisma.auditLog.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    this.prisma.auditLog.count({ where }),
  ]);

const serializedData = data.map((log) => ({
  ...log,
  id: log.id.toString(),
}));

return {
  data: serializedData,
  meta: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  },
};
}

  async log(
    input: CreateAuditLogInput,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;

    return client.auditLog.create({
      data: {
        userId: this.clsContext.userId ?? null,
        role: this.clsContext.role ?? null,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId ?? null,
        before: input.before,
        after: input.after,
        ipAddress: this.clsContext.ipAddress ?? null,
      },
    });
  }
}