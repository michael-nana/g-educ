import { CreateAcademicYearDto } from '../dto/create-academic-year.dto';
import { AcademicYearsService } from '../services/academic-years.service';
export declare class AcademicYearsController {
    private readonly academicYearsService;
    constructor(academicYearsService: AcademicYearsService);
    findCurrent(): Promise<{
        id: string;
        label: string;
        startDate: Date;
        endDate: Date;
        isCurrent: boolean;
        createdAt: Date;
    }>;
    create(dto: CreateAcademicYearDto): Promise<{
        id: string;
        label: string;
        startDate: Date;
        endDate: Date;
        isCurrent: boolean;
        createdAt: Date;
    }>;
}
