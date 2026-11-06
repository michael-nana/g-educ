import { Injectable } from '@nestjs/common';

import {
  NotificationType,
  Role,
  UserStatus,
} from '../../../generated/prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationsService } from './notifications.service';
import type { CreateAnnouncementDto } from '../dto/create-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(dto: CreateAnnouncementDto) {
    const payload = {
      type: NotificationType.SYSTEME,
      title: dto.title,
      body: dto.body,
      ...(dto.data && { data: dto.data }),
    };

    if (dto.classId) {
      const result = await this.notificationsService.notifyClass(
        dto.classId,
        payload,
      );

      return {
        message: 'Annonce envoyée à la classe.',
        ...result,
      };
    }

    const students = await this.prisma.user.findMany({
      where: {
        role: Role.ELEVE,
        status: UserStatus.ACTIF,
        anonymizedAt: null,
      },
      select: {
        id: true,
      },
    });

    const result = await this.notificationsService.notifyUsers(
      students.map((student) => student.id),
      payload,
    );

    return {
      message: 'Annonce envoyée à tous les élèves.',
      ...result,
    };
  }
}