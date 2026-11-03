import { PrismaService } from '../../../prisma/prisma.service';
import type { CreateSubjectDto } from '../dto/create-subject.dto';
import type { UpdateSubjectDto } from '../dto/update-subject.dto';
export declare class SubjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private generateSlug;
    private handlePrismaError;
    create(dto: CreateSubjectDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateSubjectDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        isActive: boolean;
    }>;
}
