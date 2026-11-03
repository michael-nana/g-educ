import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { MeSubjectsService } from '../services/me-subjects.service';
export declare class MeSubjectsController {
    private readonly meSubjectsService;
    constructor(meSubjectsService: MeSubjectsService);
    findMySubjects(user: AuthenticatedUser): Promise<{
        id: string;
        position: number;
        coefficient: number | null;
        subject: {
            id: string;
            name: string;
            slug: string;
        };
    }[]>;
}
