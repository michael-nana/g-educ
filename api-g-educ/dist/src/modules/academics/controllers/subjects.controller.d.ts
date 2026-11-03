import { CreateSubjectDto } from '../dto/create-subject.dto';
import { UpdateSubjectDto } from '../dto/update-subject.dto';
import { SubjectsService } from '../services/subjects.service';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
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
