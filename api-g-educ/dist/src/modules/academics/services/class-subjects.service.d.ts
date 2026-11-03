import { PrismaService } from '../../../prisma/prisma.service';
import type { AssignSubjectDto } from '../dto/assign-subject.dto';
export declare class ClassSubjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    assign(classId: string, dto: AssignSubjectDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        subjectId: string;
        coefficient: number | null;
        class: {
            id: string;
            label: string;
            code: string;
        };
        subject: {
            id: string;
            name: string;
            slug: string;
        };
    }>;
}
