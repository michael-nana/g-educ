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
exports.AcademicYearsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
const audit_actions_constants_1 = require("../../audit/constants/audit-actions.constants");
let AcademicYearsService = class AcademicYearsService {
    prisma;
    auditService;
    constructor(prisma, auditService) {
        this.prisma = prisma;
        this.auditService = auditService;
    }
    async findCurrent() {
        const academicYear = await this.prisma.academicYear.findFirst({
            where: {
                isCurrent: true,
            },
            select: {
                id: true,
                label: true,
                startDate: true,
                endDate: true,
                isCurrent: true,
                createdAt: true,
            },
        });
        if (!academicYear) {
            throw new common_1.NotFoundException('Aucune année scolaire courante n’est définie.');
        }
        return academicYear;
    }
    async create(dto) {
        const startDate = new Date(dto.startDate);
        const endDate = new Date(dto.endDate);
        if (Number.isNaN(startDate.getTime()) ||
            Number.isNaN(endDate.getTime()) ||
            startDate >= endDate) {
            throw new common_1.BadRequestException('La date de début doit être antérieure à la date de fin.');
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.academicYear.updateMany({
                where: {
                    isCurrent: true,
                },
                data: {
                    isCurrent: false,
                },
            });
            const academicYear = await tx.academicYear.create({
                data: {
                    label: dto.label.trim(),
                    startDate,
                    endDate,
                    isCurrent: true,
                },
                select: {
                    id: true,
                    label: true,
                    startDate: true,
                    endDate: true,
                    isCurrent: true,
                    createdAt: true,
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.ACADEMIC_YEAR_CREATED,
                entityType: 'AcademicYear',
                entityId: academicYear.id,
                after: {
                    label: academicYear.label,
                    startDate: academicYear.startDate.toISOString(),
                    endDate: academicYear.endDate.toISOString(),
                    isCurrent: academicYear.isCurrent,
                },
            }, tx);
            return academicYear;
        });
    }
};
exports.AcademicYearsService = AcademicYearsService;
exports.AcademicYearsService = AcademicYearsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], AcademicYearsService);
//# sourceMappingURL=academic-years.service.js.map