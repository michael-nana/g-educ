import { api } from './api';

import type {
  CreateLessonDto,
  Lesson,
  LessonDetails,
  UpdateLessonDto,
} from './lessons.types';

export const lessonsService = {
  async findAll(): Promise<Lesson[]> {
    const { data } = await api.get<Lesson[]>('/lessons');
    return data;
  },

  async findOne(id: string): Promise<LessonDetails> {
    const { data } = await api.get<LessonDetails>(`/lessons/${id}`);
    return data;
  },

  async create(chapterId: string, payload: CreateLessonDto): Promise<{ id: string }> {
    const { data } = await api.post<{ id: string }>(
      `/chapters/${chapterId}/lessons`,
      payload,
    );
    return data;
  },

  async update(id: string, payload: UpdateLessonDto): Promise<LessonDetails> {
    await api.patch(`/lessons/${id}`, payload);
    return this.findOne(id);
  },

  async uploadPdf(id: string, file: File): Promise<void> {
    const payload = new FormData();
    payload.append('file', file);

    await api.post(`/lessons/${id}/assets`, payload, {
      headers: { 'Content-Type': undefined },
    });
  },

  async uploadVideo(id: string, file: File): Promise<void> {
    const payload = new FormData();
    payload.append('file', file);
    await api.post(`/lessons/${id}/video`, payload, {
      headers: { 'Content-Type': undefined },
    });
  },

  async deleteAsset(lessonId: string, assetId: string): Promise<void> {
    await api.delete(`/lessons/${lessonId}/assets/${assetId}`);
  },

  async publish(id: string): Promise<void> {
    await api.post(`/lessons/${id}/publish`);
  },

  async archive(id: string): Promise<void> {
    await api.post(`/lessons/${id}/archive`);
  },
};
