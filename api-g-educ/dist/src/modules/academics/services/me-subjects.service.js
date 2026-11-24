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
exports.MeSubjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("../../../generated/prisma/client");
let MeSubjectsService = class MeSubjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMySubjects(userId) {
        const profile = await this.prisma.studentProfile.findUnique({
            where: { userId },
            select: {
                classId: true,
            },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profil élève introuvable');
        }
        const classSubjects = await this.prisma.classSubject.findMany({
            where: {
                classId: profile.classId,
                subject: {
                    isActive: true,
                },
            },
            select: {
                id: true,
                coefficient: true,
                position: true,
                subject: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                chapters: {
                    where: { status: client_1.ContentStatus.PUBLIE },
                    select: {
                        lessons: {
                            where: { status: client_1.ContentStatus.PUBLIE },
                            select: {
                                type: true,
                                progress: {
                                    where: { userId },
                                    select: { progressPercent: true, completedAt: true },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                position: 'asc',
            },
        });
        return classSubjects.map(({ chapters, ...classSubject }) => {
            const lessons = chapters.flatMap((chapter) => chapter.lessons);
            const totalLessons = lessons.length;
            const completedLessons = lessons.filter((lesson) => {
                const progress = lesson.progress[0];
                return Boolean(progress?.completedAt) || (lesson.type === 'VIDEO'
                    ? (progress?.progressPercent ?? 0) >= 80
                    : (progress?.progressPercent ?? 0) >= 100);
            }).length;
            const progressTotal = lessons.reduce((total, lesson) => {
                const progress = lesson.progress[0];
                const percent = progress?.progressPercent ?? 0;
                const isComplete = Boolean(progress?.completedAt) || (lesson.type === 'VIDEO'
                    ? percent >= 80
                    : percent >= 100);
                return total + (isComplete ? 100 : percent);
            }, 0);
            return {
                ...classSubject,
                progressPercent: totalLessons ? Math.round(progressTotal / totalLessons) : 0,
                completedLessons,
                totalLessons,
                totalChapters: chapters.length,
                trackedLessons: lessons.filter((lesson) => lesson.progress.length > 0).length,
            };
        });
    }
};
exports.MeSubjectsService = MeSubjectsService;
exports.MeSubjectsService = MeSubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MeSubjectsService);
//# sourceMappingURL=me-subjects.service.js.map