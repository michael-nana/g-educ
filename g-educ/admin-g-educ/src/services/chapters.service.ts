import { api } from './api';

import type {
  Chapter,
  CreateChapterDto,
  UpdateChapterDto,
} from './chapters.types';

export const chaptersService = {
  async findAll(): Promise<Chapter[]> {
    const { data } = await api.get<Chapter[]>('/chapters');
    return data;
  },

  async create(
    classSubjectId: string,
    payload: CreateChapterDto,
  ): Promise<Chapter> {
    const { data } = await api.post<Chapter>(
      `/class-subjects/${classSubjectId}/chapters`,
      payload,
    );
    return data;
  },

  async update(id: string, payload: UpdateChapterDto): Promise<Chapter> {
    const { data } = await api.patch<Chapter>(`/chapters/${id}`, payload);
    return data;
  },

  async publish(id: string): Promise<Chapter> {
    const { data } = await api.post<Chapter>(`/chapters/${id}/publish`);
    return data;
  },

  async archive(id: string): Promise<Chapter> {
    const { data } = await api.post<Chapter>(`/chapters/${id}/archive`);
    return data;
  },
};
