import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { AnnouncementsService } from '../services/announcements.service';
export declare class AnnouncementsController {
    private readonly announcementsService;
    constructor(announcementsService: AnnouncementsService);
    create(dto: CreateAnnouncementDto): Promise<{
        created: number;
        pushSent: number;
        message: string;
    }>;
}
