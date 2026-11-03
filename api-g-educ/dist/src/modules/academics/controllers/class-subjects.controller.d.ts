import { AssignSubjectDto } from '../dto/assign-subject.dto';
import { ClassSubjectsService } from '../services/class-subjects.service';
export declare class ClassSubjectsController {
    private readonly classSubjectsService;
    constructor(classSubjectsService: ClassSubjectsService);
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
