import { api } from './api';

export interface AnnalImportResult {
  lesson: { id: string; title: string };
  extractedLessons: { id: string; title: string }[];
  assessments: { id: string; title: string; kind: 'EXERCICE' | 'QUIZ' }[];
  pages: number;
  extractedCharacters: number;
  detectedExercises: number;
  detectedLessons: number;
  detectedChoiceQuestions: number;
  warning: string;
}

export const annalsService = {
  async importPdf(chapterId: string, file: File): Promise<AnnalImportResult> {
    const payload = new FormData();
    payload.append('chapterId', chapterId);
    payload.append('file', file);
    const { data } = await api.post<AnnalImportResult>('/annals/import', payload, {
      headers: { 'Content-Type': undefined },
      timeout: 120_000,
    });
    return data;
  },
};
