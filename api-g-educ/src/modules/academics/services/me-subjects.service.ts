import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

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

    return this.prisma.classSubject.findMany({
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
      },
      orderBy: {
        position: 'asc',
      },
    });
  }
}