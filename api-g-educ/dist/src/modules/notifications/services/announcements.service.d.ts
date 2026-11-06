import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationsService } from './notifications.service';
import type { CreateAnnouncementDto } from '../dto/create-announcement.dto';
export declare class AnnouncementsService {
    private readonly prisma;
    private readonly notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(dto: CreateAnnouncementDto): Promise<{
        created: number;
        pushSent: number;
        message: string;
    }>;
}
