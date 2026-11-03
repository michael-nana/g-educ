import { PrismaService } from '../../../prisma/prisma.service';
export declare class TeacherScopeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    assertCanManage(user: {
        id: string;
        role: string;
    }, classSubjectId: string): Promise<{
        id: string;
        classId: string;
        subjectId: string;
    }>;
}
