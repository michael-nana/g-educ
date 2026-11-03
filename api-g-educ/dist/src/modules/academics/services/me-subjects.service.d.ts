import { PrismaService } from '../../../prisma/prisma.service';
export declare class MeSubjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMySubjects(userId: string): Promise<{
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
