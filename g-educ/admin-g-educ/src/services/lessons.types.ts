import type { ChapterStatus } from './chapters.types';

export type LessonType = 'TEXTE' | 'PDF' | 'VIDEO';
export type LessonStatus = 'BROUILLON' | 'PUBLIE' | 'ARCHIVE';

export interface Lesson {
  id: string;
  chapterId: string;
  classId: string;
  title: string;
  type: LessonType;
  position: number;
  status: LessonStatus;
  version: number;
  durationSeconds: number | null;
  publishedAt: string | null;
  createdAt: string;
  chapter: {
    id: string;
    title: string;
    status: ChapterStatus;
    classSubjectId: string;
  };
  _count: {
    assets: number;
  };
}

export interface LessonAsset {
  id: string;
  kind: 'PDF' | 'VIDEO' | 'IMAGE' | 'THUMBNAIL';
  mimeType: string;
  sizeBytes: number;
  durationSeconds: number | null;
  createdAt: string;
  downloadUrl: string;
}

export interface LessonDetails {
  id: string;
  chapterId: string;
  title: string;
  type: LessonType;
  contentMarkdown: string | null;
  videoUrl: string | null;
  durationSeconds: number | null;
  position: number;
  status: LessonStatus;
  version: number;
  publishedAt: string | null;
  assets: LessonAsset[];
  myProgress: unknown;
}

export interface CreateLessonDto {
  title: string;
  type: LessonType;
  contentMarkdown?: string;
  position?: number;
  durationSeconds?: number;
  videoUrl?: string;
}

export interface UpdateLessonDto {
  title?: string;
  contentMarkdown?: string;
  position?: number;
  durationSeconds?: number;
  videoUrl?: string | null;
}
