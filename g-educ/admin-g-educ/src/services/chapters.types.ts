export type ChapterStatus = 'BROUILLON' | 'PUBLIE' | 'ARCHIVE';

export interface Chapter {
  id: string;
  classSubjectId: string;
  classId: string;
  title: string;
  description: string | null;
  position: number;
  status: ChapterStatus;
  version: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  classSubject: {
    class: {
      code: string;
      label: string;
    };
    subject: {
      name: string;
    };
  };
}

export interface CreateChapterDto {
  title: string;
  description?: string;
  position?: number;
}

export type UpdateChapterDto = Partial<CreateChapterDto>;
