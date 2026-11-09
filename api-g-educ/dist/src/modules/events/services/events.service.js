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
var EventsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
const audit_actions_constants_1 = require("../../audit/constants/audit-actions.constants");
const teacher_scope_service_1 = require("../../academics/services/teacher-scope.service");
const notifications_service_1 = require("../../notifications/services/notifications.service");
let EventsService = EventsService_1 = class EventsService {
    prisma;
    auditService;
    teacherScope;
    notificationsService;
    logger = new common_1.Logger(EventsService_1.name);
    constructor(prisma, auditService, teacherScope, notificationsService) {
        this.prisma = prisma;
        this.auditService = auditService;
        this.teacherScope = teacherScope;
        this.notificationsService = notificationsService;
    }
    buildReminderDates(startsAt) {
        const eventDay = new Date(Date.UTC(startsAt.getUTCFullYear(), startsAt.getUTCMonth(), startsAt.getUTCDate()));
        const now = new Date();
        const dates = [];
        for (const daysBefore of [7, 1, 0]) {
            const reminderDate = new Date(eventDay);
            reminderDate.setUTCDate(reminderDate.getUTCDate() - daysBefore);
            reminderDate.setUTCHours(7, 0, 0, 0);
            if (reminderDate > now) {
                dates.push(reminderDate);
            }
        }
        return dates;
    }
    async assertCanManageEvent(user, classId, subjectId) {
        if (!subjectId) {
            await this.teacherScope.assertCanManageClass(user, classId);
            return;
        }
        const classSubject = await this.prisma.classSubject.findFirst({
            where: {
                classId,
                subjectId,
            },
            select: {
                id: true,
            },
        });
        if (!classSubject) {
            throw new common_1.NotFoundException('Cette matière n’est pas enseignée dans cette classe');
        }
        await this.teacherScope.assertCanManage(user, classSubject.id);
    }
    validateDates(startsAt, endsAt) {
        if (Number.isNaN(startsAt.getTime())) {
            throw new common_1.BadRequestException('Date de début invalide');
        }
        if (endsAt && Number.isNaN(endsAt.getTime())) {
            throw new common_1.BadRequestException('Date de fin invalide');
        }
        if (endsAt && endsAt <= startsAt) {
            throw new common_1.BadRequestException('La date de fin doit être postérieure à la date de début');
        }
    }
    async create(user, dto) {
        const title = dto.title.trim();
        if (!title) {
            throw new common_1.BadRequestException('Le titre est obligatoire');
        }
        const startsAt = new Date(dto.startsAt);
        const endsAt = dto.endsAt ? new Date(dto.endsAt) : null;
        this.validateDates(startsAt, endsAt);
        await this.assertCanManageEvent(user, dto.classId, dto.subjectId);
        const event = await this.prisma.$transaction(async (tx) => {
            const created = await tx.event.create({
                data: {
                    classId: dto.classId,
                    type: dto.type,
                    title,
                    description: dto.description?.trim() || null,
                    subjectId: dto.subjectId ?? null,
                    startsAt,
                    endsAt,
                    createdById: user.id,
                },
            });
            const reminderDates = this.buildReminderDates(startsAt);
            if (reminderDates.length > 0) {
                await tx.eventReminder.createMany({
                    data: reminderDates.map((remindAt) => ({
                        eventId: created.id,
                        remindAt,
                    })),
                });
            }
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.EVENT_CREATED,
                entityType: 'Event',
                entityId: created.id,
                after: {
                    title: created.title,
                    type: created.type,
                    classId: created.classId,
                    subjectId: created.subjectId,
                    startsAt: created.startsAt,
                    endsAt: created.endsAt,
                    status: created.status,
                    reminderCount: reminderDates.length,
                },
            }, tx);
            return created;
        });
        try {
            await this.notificationsService.notifyClass(dto.classId, {
                type: client_1.NotificationType.EVENEMENT_ANNONCE,
                title: 'Nouvel événement',
                body: `${event.title} — ${event.startsAt.toLocaleString('fr-FR', {
                    timeZone: 'Africa/Ouagadougou',
                })}`,
                data: {
                    eventId: event.id,
                    type: event.type,
                },
            });
        }
        catch (error) {
            this.logger.error(`Impossible d'envoyer l'annonce de l'événement ${event.id}`, error instanceof Error ? error.stack : String(error));
        }
        return event;
    }
    async update(user, eventId, dto) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Événement introuvable');
        }
        if (event.status === client_1.ContentStatus.ARCHIVE) {
            throw new common_1.BadRequestException('Un événement archivé ne peut pas être modifié');
        }
        await this.assertCanManageEvent(user, event.classId, dto.subjectId === undefined ? event.subjectId : dto.subjectId);
        const hasChanges = Object.values(dto).some((value) => value !== undefined);
        if (!hasChanges) {
            throw new common_1.BadRequestException('Aucune modification fournie');
        }
        const startsAt = dto.startsAt !== undefined
            ? new Date(dto.startsAt)
            : event.startsAt;
        const endsAt = dto.endsAt !== undefined
            ? dto.endsAt
                ? new Date(dto.endsAt)
                : null
            : event.endsAt;
        this.validateDates(startsAt, endsAt);
        if (dto.title !== undefined && !dto.title.trim()) {
            throw new common_1.BadRequestException('Le titre est obligatoire');
        }
        const startsAtChanged = dto.startsAt !== undefined &&
            startsAt.getTime() !== event.startsAt.getTime();
        return this.prisma.$transaction(async (tx) => {
            if (startsAtChanged) {
                await tx.eventReminder.updateMany({
                    where: {
                        eventId,
                        status: client_1.ReminderStatus.PLANIFIE,
                    },
                    data: {
                        status: client_1.ReminderStatus.ANNULE,
                    },
                });
            }
            const updated = await tx.event.update({
                where: { id: eventId },
                data: {
                    ...(dto.type !== undefined && { type: dto.type }),
                    ...(dto.title !== undefined && {
                        title: dto.title.trim(),
                    }),
                    ...(dto.description !== undefined && {
                        description: dto.description?.trim() || null,
                    }),
                    ...(dto.subjectId !== undefined && {
                        subjectId: dto.subjectId,
                    }),
                    ...(dto.startsAt !== undefined && { startsAt }),
                    ...(dto.endsAt !== undefined && { endsAt }),
                },
            });
            let newReminderCount = 0;
            if (startsAtChanged) {
                const reminderDates = this.buildReminderDates(startsAt);
                newReminderCount = reminderDates.length;
                if (reminderDates.length > 0) {
                    await tx.eventReminder.createMany({
                        data: reminderDates.map((remindAt) => ({
                            eventId,
                            remindAt,
                        })),
                    });
                }
            }
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.EVENT_UPDATED,
                entityType: 'Event',
                entityId: eventId,
                before: {
                    title: event.title,
                    type: event.type,
                    subjectId: event.subjectId,
                    startsAt: event.startsAt,
                    endsAt: event.endsAt,
                },
                after: {
                    title: updated.title,
                    type: updated.type,
                    subjectId: updated.subjectId,
                    startsAt: updated.startsAt,
                    endsAt: updated.endsAt,
                    remindersReplanned: startsAtChanged,
                    newReminderCount,
                },
            }, tx);
            return updated;
        });
    }
    async archive(user, eventId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Événement introuvable');
        }
        if (event.status === client_1.ContentStatus.ARCHIVE) {
            throw new common_1.BadRequestException('Cet événement est déjà archivé');
        }
        await this.assertCanManageEvent(user, event.classId, event.subjectId);
        return this.prisma.$transaction(async (tx) => {
            const archived = await tx.event.update({
                where: { id: eventId },
                data: {
                    status: client_1.ContentStatus.ARCHIVE,
                },
            });
            await tx.eventReminder.updateMany({
                where: {
                    eventId,
                    status: client_1.ReminderStatus.PLANIFIE,
                },
                data: {
                    status: client_1.ReminderStatus.ANNULE,
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.EVENT_ARCHIVED,
                entityType: 'Event',
                entityId: eventId,
                before: {
                    title: event.title,
                    status: event.status,
                },
                after: {
                    title: archived.title,
                    status: archived.status,
                },
            }, tx);
            return archived;
        });
    }
    async findAll(user, filters) {
        const where = {
            status: client_1.ContentStatus.PUBLIE,
            ...(filters.from || filters.to
                ? {
                    startsAt: {
                        ...(filters.from && {
                            gte: new Date(filters.from),
                        }),
                        ...(filters.to && {
                            lte: new Date(filters.to),
                        }),
                    },
                }
                : {}),
            ...(filters.type && { type: filters.type }),
            ...(filters.subjectId && {
                subjectId: filters.subjectId,
            }),
        };
        if (user.role === client_1.Role.ELEVE) {
            if (!user.classId) {
                throw new common_1.NotFoundException('Aucune classe associée à votre compte');
            }
            where.classId = user.classId;
        }
        return this.prisma.event.findMany({
            where,
            orderBy: {
                startsAt: 'asc',
            },
            include: {
                subject: {
                    select: {
                        id: true,
                        name: true,
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
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = EventsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        teacher_scope_service_1.TeacherScopeService,
        notifications_service_1.NotificationsService])
], EventsService);
//# sourceMappingURL=events.service.js.map