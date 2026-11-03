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
exports.ClassSubjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ClassSubjectsService = class ClassSubjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assign(classId, dto) {
        const schoolClass = await this.prisma.class.findUnique({
            where: { id: classId },
            select: { id: true },
        });
        if (!schoolClass) {
            throw new common_1.NotFoundException('Classe introuvable.');
        }
        const subject = await this.prisma.subject.findUnique({
            where: { id: dto.subjectId },
            select: {
                id: true,
                isActive: true,
            },
        });
        if (!subject) {
            throw new common_1.NotFoundException('Matière introuvable.');
        }
        if (!subject.isActive) {
            throw new common_1.ConflictException('Impossible d’affecter une matière désactivée.');
        }
        try {
            return await this.prisma.classSubject.create({
                data: {
                    classId,
                    subjectId: dto.subjectId,
                    coefficient: dto.coefficient,
                    position: dto.position ?? 0,
                },
                select: {
                    id: true,
                    classId: true,
                    subjectId: true,
                    coefficient: true,
                    position: true,
                    createdAt: true,
                    subject: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                    class: {
                        select: {
                            id: true,
                            code: true,
                            label: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            if (error &&
                typeof error === 'object' &&
                'code' in error &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('Cette matière est déjà affectée à cette classe.');
            }
            throw error;
        }
    }
};
exports.ClassSubjectsService = ClassSubjectsService;
exports.ClassSubjectsService = ClassSubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassSubjectsService);
//# sourceMappingURL=class-subjects.service.js.map