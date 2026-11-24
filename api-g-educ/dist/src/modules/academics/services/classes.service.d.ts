import { PrismaService } from '../../../prisma/prisma.service';
export declare class ClassesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        label: string;
        code: string;
        cycle: import("../../../generated/prisma/enums").SchoolCycle;
        level: import("../../../generated/prisma/enums").ClassLevel;
        series: import("../../../generated/prisma/enums").ClassSeries | null;
        position: number;
    }[]>;
}
