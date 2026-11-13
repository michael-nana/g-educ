
import { api } from './api';

import type {
  AssignSubjectDto,
  ClassSubject,
} from './class-subjects.types';

export const classSubjectsService = {
  async findAllAssignments(): Promise<ClassSubject[]> {
    const { data } = await api.get<ClassSubject[]>('/class-subjects');

    return data;
  },

  async findAll(classId: string): Promise<ClassSubject[]> {
    const { data } = await api.get<ClassSubject[]>(
      `/classes/${classId}/subjects`,
    );

    return data;
  },

  async assign(
    classId: string,
    payload: AssignSubjectDto,
  ): Promise<ClassSubject> {
    const { data } = await api.post<ClassSubject>(
      `/classes/${classId}/subjects`,
      payload,
    );

    return data;
  },
};
