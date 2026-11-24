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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
function averageScore(attempts) {
    const scored = attempts.filter((attempt) => attempt.score !== null && (attempt.maxScore ?? 0) > 0);
    if (!scored.length)
        return null;
    return Math.round(scored.reduce((sum, attempt) => sum + (attempt.score / attempt.maxScore) * 100, 0) / scored.length);
}
let ProgressService = class ProgressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMyProgress(user) {
        const profile = await this.prisma.studentProfile.findUnique({
            where: { userId: user.id },
            select: { classId: true },
        });
        if (!profile)
            throw new common_1.NotFoundException('Profil élève introuvable');
        const classSubjects = await this.prisma.classSubject.findMany({
            where: { classId: profile.classId, subject: { isActive: true } },
            orderBy: { position: 'asc' },
            select: {
                id: true,
                coefficient: true,
                subject: { select: { id: true, name: true, slug: true } },
                chapters: {
                    where: { status: client_1.ContentStatus.PUBLIE },
                    orderBy: { position: 'asc' },
                    select: {
                        id: true,
                        title: true,
                        position: true,
                        lessons: {
                            where: { status: client_1.ContentStatus.PUBLIE },
                            orderBy: { position: 'asc' },
                            select: {
                                id: true,
                                type: true,
                                position: true,
                                progress: {
                                    where: { userId: user.id },
                                    select: { progressPercent: true, completedAt: true },
                                },
                            },
                        },
                        assessments: {
                            select: {
                                id: true,
                                kind: true,
                                attempts: {
                                    where: { userId: user.id, status: client_1.AttemptStatus.TERMINEE },
                                    orderBy: { submittedAt: 'desc' },
                                    select: { score: true, maxScore: true, submittedAt: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        const subjects = classSubjects.map((classSubject) => {
            const lessons = classSubject.chapters.flatMap((chapter) => chapter.lessons);
            const lessonStats = this.calculateLessonStats(lessons);
            const allAttempts = classSubject.chapters.flatMap((chapter) => chapter.assessments.flatMap((assessment) => assessment.attempts));
            const quizAttempts = classSubject.chapters.flatMap((chapter) => chapter.assessments
                .filter((assessment) => assessment.kind === 'QUIZ')
                .flatMap((assessment) => assessment.attempts));
            return {
                classSubjectId: classSubject.id,
                subject: classSubject.subject,
                coefficient: classSubject.coefficient,
                ...lessonStats,
                totalChapters: classSubject.chapters.length,
                averageScore: averageScore(allAttempts),
                attemptCount: allAttempts.length,
                quizAverageScore: averageScore(quizAttempts),
                quizAttemptCount: quizAttempts.length,
                chapters: classSubject.chapters.map((chapter) => {
                    const chapterStats = this.calculateLessonStats(chapter.lessons);
                    const attempts = chapter.assessments.flatMap((assessment) => assessment.attempts);
                    const chapterQuizAttempts = chapter.assessments
                        .filter((assessment) => assessment.kind === 'QUIZ')
                        .flatMap((assessment) => assessment.attempts);
                    return {
                        id: chapter.id,
                        title: chapter.title,
                        position: chapter.position,
                        ...chapterStats,
                        assessmentCount: chapter.assessments.length,
                        averageScore: averageScore(attempts),
                        attemptCount: attempts.length,
                        quizAverageScore: averageScore(chapterQuizAttempts),
                        quizAttemptCount: chapterQuizAttempts.length,
                    };
                }),
            };
        });
        const quizAttempts = classSubjects.flatMap((classSubject) => classSubject.chapters.flatMap((chapter) => chapter.assessments
            .filter((assessment) => assessment.kind === 'QUIZ')
            .flatMap((assessment) => assessment.attempts)));
        const totalLessons = subjects.reduce((sum, subject) => sum + subject.totalLessons, 0);
        const completedLessons = subjects.reduce((sum, subject) => sum + subject.completedLessons, 0);
        const progressTotal = subjects.reduce((sum, subject) => sum + subject.progressPercent * subject.totalLessons, 0);
        return {
            summary: {
                progressPercent: totalLessons
                    ? Math.round(progressTotal / totalLessons)
                    : 0,
                totalLessons,
                completedLessons,
                totalSubjects: subjects.length,
                totalChapters: subjects.reduce((sum, subject) => sum + subject.totalChapters, 0),
                quizAverageScore: averageScore(quizAttempts),
                quizAttemptCount: quizAttempts.length,
            },
            subjects,
        };
    }
    async findMySubjectProgress(user, classSubjectId) {
        const progress = await this.findMyProgress(user);
        const subject = progress.subjects.find((item) => item.classSubjectId === classSubjectId);
        if (!subject)
            throw new common_1.NotFoundException('Matière introuvable');
        return subject;
    }
    calculateLessonStats(lessons) {
        const lessonValues = lessons.map((lesson) => {
            const progress = lesson.progress[0];
            const percent = progress?.progressPercent ?? 0;
            const completed = Boolean(progress?.completedAt) ||
                (lesson.type === 'VIDEO' ? percent >= 80 : percent >= 100);
            return {
                completed,
                percent: completed ? 100 : Math.max(0, Math.min(percent, 100)),
                tracked: Boolean(progress),
            };
        });
        return {
            totalLessons: lessons.length,
            completedLessons: lessonValues.filter((item) => item.completed).length,
            trackedLessons: lessonValues.filter((item) => item.tracked).length,
            progressPercent: lessonValues.length
                ? Math.round(lessonValues.reduce((sum, item) => sum + item.percent, 0) /
                    lessonValues.length)
                : 0,
        };
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgressService);
//# sourceMappingURL=progress.service.js.map