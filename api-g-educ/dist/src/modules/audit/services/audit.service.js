"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const cls_context_service_1 = require("../../../common/cls/cls-context.service");
let AuditService = class AuditService {
    prisma;
    clsContext;
    constructor(prisma, clsContext) {
        this.prisma = prisma;
        this.clsContext = clsContext;
    }
    async findAll(filters) {
        const { userId, entityType, entityId, action, from, to, page = 1, limit = 20, } = filters;
        const where = {
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
    async log(input, tx) {
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
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cls_context_service_1.ClsContextService])
], AuditService);
//# sourceMappingURL=audit.service.js.map