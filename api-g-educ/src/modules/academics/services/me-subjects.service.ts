import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { ContentStatus } from '../../../generated/prisma/client';

@Injectable()
export class MeSubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMySubjects(userId: string) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: {
        classId: true,
      },
    });

    if (!profile) {
      throw new NotFoundException(
        'Profil élève introuvable',
      );
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
          where: { status: ContentStatus.PUBLIE },
          select: {
            lessons: {
              where: { status: ContentStatus.PUBLIE },
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
}
