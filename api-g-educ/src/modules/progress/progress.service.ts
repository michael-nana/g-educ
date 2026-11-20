import { Injectable, NotFoundException } from '@nestjs/common';

import { ContentStatus, AttemptStatus } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';

type AttemptScore = {
  score: number | null;
  maxScore: number | null;
  submittedAt: Date | null;
};

function averageScore(attempts: AttemptScore[]) {
  const scored = attempts.filter(
    (attempt) => attempt.score !== null && (attempt.maxScore ?? 0) > 0,
  );
  if (!scored.length) return null;
  return Math.round(
    scored.reduce(
      (sum, attempt) => sum + (attempt.score! / attempt.maxScore!) * 100,
      0,
    ) / scored.length,
  );
}

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async findMyProgress(user: AuthenticatedUser) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId: user.id },
      select: { classId: true },
    });
    if (!profile) throw new NotFoundException('Profil élève introuvable');

    const classSubjects = await this.prisma.classSubject.findMany({
      where: { classId: profile.classId, subject: { isActive: true } },
      orderBy: { position: 'asc' },
      select: {
        id: true,
        coefficient: true,
        subject: { select: { id: true, name: true, slug: true } },
        chapters: {
          where: { status: ContentStatus.PUBLIE },
          orderBy: { position: 'asc' },
          select: {
            id: true,
            title: true,
            position: true,
            lessons: {
              where: { status: ContentStatus.PUBLIE },
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
                  where: { userId: user.id, status: AttemptStatus.TERMINEE },
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
      const lessons = classSubject.chapters.flatMap(
        (chapter) => chapter.lessons,
      );
      const lessonStats = this.calculateLessonStats(lessons);
      const allAttempts = classSubject.chapters.flatMap((chapter) =>
        chapter.assessments.flatMap((assessment) => assessment.attempts),
      );
      const quizAttempts = classSubject.chapters.flatMap((chapter) =>
        chapter.assessments
          .filter((assessment) => assessment.kind === 'QUIZ')
          .flatMap((assessment) => assessment.attempts),
      );

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
          const attempts = chapter.assessments.flatMap(
            (assessment) => assessment.attempts,
          );
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

    const quizAttempts = classSubjects.flatMap((classSubject) =>
      classSubject.chapters.flatMap((chapter) =>
        chapter.assessments
          .filter((assessment) => assessment.kind === 'QUIZ')
          .flatMap((assessment) => assessment.attempts),
      ),
    );
    const totalLessons = subjects.reduce(
      (sum, subject) => sum + subject.totalLessons,
      0,
    );
    const completedLessons = subjects.reduce(
      (sum, subject) => sum + subject.completedLessons,
      0,
    );
    const progressTotal = subjects.reduce(
      (sum, subject) => sum + subject.progressPercent * subject.totalLessons,
      0,
    );

    return {
      summary: {
        progressPercent: totalLessons
          ? Math.round(progressTotal / totalLessons)
          : 0,
        totalLessons,
        completedLessons,
        totalSubjects: subjects.length,
        totalChapters: subjects.reduce(
          (sum, subject) => sum + subject.totalChapters,
          0,
        ),
        quizAverageScore: averageScore(quizAttempts),
        quizAttemptCount: quizAttempts.length,
      },
      subjects,
    };
  }

  async findMySubjectProgress(user: AuthenticatedUser, classSubjectId: string) {
    const progress = await this.findMyProgress(user);
    const subject = progress.subjects.find(
      (item) => item.classSubjectId === classSubjectId,
    );
    if (!subject) throw new NotFoundException('Matière introuvable');
    return subject;
  }

  private calculateLessonStats(
    lessons: Array<{
      type: string;
      progress: Array<{ progressPercent: number; completedAt: Date | null }>;
    }>,
  ) {
    const lessonValues = lessons.map((lesson) => {
      const progress = lesson.progress[0];
      const percent = progress?.progressPercent ?? 0;
      const completed =
        Boolean(progress?.completedAt) ||
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
        ? Math.round(
            lessonValues.reduce((sum, item) => sum + item.percent, 0) /
              lessonValues.length,
          )
        : 0,
    };
  }
}
