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
exports.StudySessionsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
let StudySessionsService = class StudySessionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toDate(value) {
        return new Date(value);
    }
    toDateOnly(value) {
        return value.toISOString().slice(0, 10);
    }
    validatePeriod(startsAt, endsAt) {
        if (endsAt.getTime() <= startsAt.getTime()) {
            throw new common_1.BadRequestException('La date de fin doit être postérieure à la date de début.');
        }
    }
    validateRecurrence(recurrence, recurrenceEndsOn, startsAt) {
        if (recurrence === client_1.Recurrence.AUCUNE) {
            return;
        }
        if (!recurrenceEndsOn) {
            throw new common_1.BadRequestException('Une date de fin est obligatoire pour une séance récurrente.');
        }
        if (this.toDateOnly(recurrenceEndsOn) <
            this.toDateOnly(startsAt)) {
            throw new common_1.BadRequestException('La date de fin de récurrence ne peut pas précéder la date de début.');
        }
    }
    async validateSubject(userId, subjectId) {
        if (!subjectId) {
            return;
        }
        const profile = await this.prisma.studentProfile.findUnique({
            where: { userId },
            select: {
                classId: true,
            },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profil élève introuvable.');
        }
        const classSubject = await this.prisma.classSubject.findFirst({
            where: {
                classId: profile.classId,
                subjectId,
                subject: {
                    isActive: true,
                },
            },
            select: {
                id: true,
            },
        });
        if (!classSubject) {
            throw new common_1.NotFoundException('Matière introuvable pour cette classe.');
        }
    }
    isUniqueConstraintError(error) {
        return (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002');
    }
    async findByClientId(userId, clientId) {
        return this.prisma.studySession.findUnique({
            where: {
                userId_clientId: {
                    userId,
                    clientId,
                },
            },
        });
    }
    async create(userId, dto) {
        const title = dto.title.trim();
        if (!title) {
            throw new common_1.BadRequestException('Le titre de la séance est obligatoire.');
        }
        const existing = await this.findByClientId(userId, dto.clientId);
        if (existing) {
            return existing;
        }
        const startsAt = this.toDate(dto.startsAt);
        const endsAt = this.toDate(dto.endsAt);
        this.validatePeriod(startsAt, endsAt);
        const recurrence = dto.recurrence ?? client_1.Recurrence.AUCUNE;
        const recurrenceEndsOn = dto.recurrenceEndsOn
            ? this.toDate(`${dto.recurrenceEndsOn}T00:00:00.000Z`)
            : null;
        this.validateRecurrence(recurrence, recurrenceEndsOn, startsAt);
        await this.validateSubject(userId, dto.subjectId);
        try {
            return await this.prisma.studySession.create({
                data: {
                    userId,
                    clientId: dto.clientId,
                    title,
                    subjectId: dto.subjectId ?? null,
                    startsAt,
                    endsAt,
                    recurrence,
                    recurrenceEndsOn,
                    reminderMinutesBefore: dto.reminderMinutesBefore ?? 15,
                },
            });
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                const concurrentSession = await this.findByClientId(userId, dto.clientId);
                if (concurrentSession) {
                    return concurrentSession;
                }
            }
            throw error;
        }
    }
    async findAll(userId, filters) {
        const { from, to, updatedSince } = filters;
        if (from && to && new Date(from) > new Date(to)) {
            throw new common_1.BadRequestException('La date de début du filtre doit précéder la date de fin.');
        }
        const where = {
            userId,
        };
        if (updatedSince) {
            where.updatedAt = {
                gte: this.toDate(updatedSince),
            };
        }
        else {
            where.deletedAt = null;
        }
        if (from || to) {
            where.startsAt = {
                ...(from ? { gte: this.toDate(from) } : {}),
                ...(to ? { lte: this.toDate(to) } : {}),
            };
        }
        return this.prisma.studySession.findMany({
            where,
            orderBy: updatedSince
                ? { updatedAt: 'asc' }
                : { startsAt: 'asc' },
        });
    }
    async update(userId, id, dto) {
        const existing = await this.prisma.studySession.findFirst({
            where: {
                id,
                userId,
                deletedAt: null,
            },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Séance de révision introuvable.');
        }
        const startsAt = dto.startsAt
            ? this.toDate(dto.startsAt)
            : existing.startsAt;
        const endsAt = dto.endsAt
            ? this.toDate(dto.endsAt)
            : existing.endsAt;
        this.validatePeriod(startsAt, endsAt);
        const recurrence = dto.recurrence ?? existing.recurrence;
        const recurrenceEndsOn = dto.recurrenceEndsOn === null
            ? null
            : dto.recurrenceEndsOn !== undefined
                ? this.toDate(`${dto.recurrenceEndsOn}T00:00:00.000Z`)
                : existing.recurrenceEndsOn;
        this.validateRecurrence(recurrence, recurrenceEndsOn, startsAt);
        const subjectId = dto.subjectId !== undefined
            ? dto.subjectId
            : existing.subjectId;
        await this.validateSubject(userId, subjectId);
        const title = dto.title !== undefined
            ? dto.title.trim()
            : existing.title;
        if (!title) {
            throw new common_1.BadRequestException('Le titre de la séance est obligatoire.');
        }
        try {
            return await this.prisma.studySession.update({
                where: {
                    id,
                    userId,
                    deletedAt: null,
                },
                data: {
                    title,
                    subjectId,
                    startsAt,
                    endsAt,
                    recurrence,
                    recurrenceEndsOn,
                    ...(dto.reminderMinutesBefore !== undefined
                        ? {
                            reminderMinutesBefore: dto.reminderMinutesBefore,
                        }
                        : {}),
                    ...(dto.completedAt !== undefined
                        ? {
                            completedAt: dto.completedAt === null
                                ? null
                                : this.toDate(dto.completedAt),
                        }
                        : {}),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException('Séance de révision introuvable.');
            }
            throw error;
        }
    }
    async remove(userId, id) {
        try {
            return await this.prisma.studySession.update({
                where: {
                    id,
                    userId,
                    deletedAt: null,
                },
                data: {
                    deletedAt: new Date(),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException('Séance de révision introuvable.');
            }
            throw error;
        }
    }
};
exports.StudySessionsService = StudySessionsService;
exports.StudySessionsService = StudySessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudySessionsService);
//# sourceMappingURL=study-sessions.service.js.map