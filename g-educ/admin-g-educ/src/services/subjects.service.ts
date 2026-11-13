
import { api } from './api';

import type {
  Subject,
  CreateSubjectDto,
  UpdateSubjectDto,
} from './subjects.types';

export const subjectsService = {
  async create(payload: CreateSubjectDto): Promise<Subject> {
    const { data } = await api.post<Subject>('/subjects', payload);
    return data;
  },

  async update(
    id: string,
    payload: UpdateSubjectDto,
  ): Promise<Subject> {
    const { data } = await api.patch<Subject>(
      `/subjects/${id}`,
      payload,
    );

    return data;
  },

  async findAll(): Promise<Subject[]> {
  const { data } = await api.get<Subject[]>('/subjects');
  return data;
},
};
