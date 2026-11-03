import { ClassesService } from '../services/classes.service';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
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
