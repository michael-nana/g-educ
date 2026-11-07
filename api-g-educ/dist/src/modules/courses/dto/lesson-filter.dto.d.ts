import { LessonType } from '../../../generated/prisma/client';
export declare class LessonFilterDto {
    chapterId?: string;
    classSubjectId?: string;
    type?: LessonType;
    favorite?: string;
}
