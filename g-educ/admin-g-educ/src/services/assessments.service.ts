import { api } from './api';

import type {
  Assessment,
  AssessmentKind,
  CreateAssessmentDto,
  UpdateAssessmentDto,
} from './assessments.types';

export const assessmentsService = {
  async uploadExerciseFile(id: string, fileType: 'EXERCISE' | 'CORRECTION', file: File): Promise<{ name: string }> {
    const payload = new FormData();
    payload.append('file', file);
    const { data } = await api.post<{ name: string }>(`/assessments/${id}/files/${fileType}`, payload, {
      headers: { 'Content-Type': undefined },
    });
    return data;
  },

  async findForChapter(chapterId: string): Promise<Assessment[]> {
    const { data } = await api.get<Assessment[]>(
      `/chapters/${chapterId}/assessments`,
    );
    return data;
  },

  async create(
    chapterId: string,
    kind: AssessmentKind,
    payload: CreateAssessmentDto,
  ): Promise<Assessment> {
    const endpoint = kind === 'EXERCICE' ? 'exercises' : 'quizzes';
    const { data } = await api.post<Assessment>(
      `/chapters/${chapterId}/${endpoint}`,
      payload,
    );
    return data;
  },

  async update(
    id: string,
    payload: UpdateAssessmentDto,
  ): Promise<Assessment> {
    const { data } = await api.patch<Assessment>(
      `/assessments/${id}`,
      payload,
    );
    return data;
  },

  async publish(id: string): Promise<Assessment> {
    const { data } = await api.post<Assessment>(
      `/assessments/${id}/publish`,
    );
    return data;
  },

  async archive(id: string): Promise<Assessment> {
    const { data } = await api.post<Assessment>(
      `/assessments/${id}/archive`,
    );
    return data;
  },
};
