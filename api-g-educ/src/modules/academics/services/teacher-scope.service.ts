import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TeacherScopeService {
  constructor(private readonly prisma: PrismaService) {}

  async assertCanManage(
    user: { id: string; role: string },
    classSubjectId: string,
  ) {
    const classSubject = await this.prisma.classSubject.findUnique({
      where: { id: classSubjectId },
      select: {
        id: true,
        classId: true,
        subjectId: true,
      },
    });

    if (!classSubject) {
      throw new NotFoundException('Matière de classe introuvable');
    }

    if (user.role === 'ADMINISTRATEUR') {
      return classSubject;
    }

    if (user.role !== 'ENSEIGNANT') {
      throw new ForbiddenException(
        'Vous ne pouvez pas gérer cette matière',
      );
    }

    const assignment = await this.prisma.teacherAssignment.findFirst({
      where: {
        userId: user.id,
        classSubjectId,
      },
      select: { id: true },
    });

    if (!assignment) {
      throw new ForbiddenException(
        'Vous n êtes pas affecté à cette matière',
      );
    }

    return classSubject;
  }

  async assertCanManageClass(
  user: { id: string; role: string },
  classId: string,
) {
  const classExists = await this.prisma.class.findUnique({
    where: { id: classId },
    select: { id: true },
  });

  if (!classExists) {
    throw new NotFoundException('Classe introuvable');
  }

  if (user.role === 'ADMINISTRATEUR') {
    return classExists;
  }

  if (user.role !== 'ENSEIGNANT') {
    throw new ForbiddenException(
      'Vous ne pouvez pas gérer les événements de cette classe',
    );
  }

  const assignment = await this.prisma.teacherAssignment.findFirst({
    where: {
      userId: user.id,
      classSubject: {
        classId,
      },
    },
    select: {
      id: true,
    },
  });

  if (!assignment) {
    throw new ForbiddenException(
      'Vous n’êtes affecté à aucune matière de cette classe',
    );
  }

  return classExists;
}
}