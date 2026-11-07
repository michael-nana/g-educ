import { LessonType } from '../../../generated/prisma/client';
export declare class CreateLessonDto {
    title: string;
    type: LessonType;
    contentMarkdown?: string;
    position?: number;
    durationSeconds?: number;
}
