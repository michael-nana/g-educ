import { api } from './api';

import type {
  AcademicYear,
  CreateAcademicYearDto,
} from './academic-years.types';

export const academicYearsService = {
  async findAll(): Promise<AcademicYear[]> {
    const { data } = await api.get<AcademicYear[]>('/academic-years');
    return data;
  },

  async findCurrent(): Promise<AcademicYear> {
    const { data } = await api.get<AcademicYear>(
      '/academic-years/current',
    );
    return data;
  },

  async create(payload: CreateAcademicYearDto): Promise<AcademicYear> {
    const { data } = await api.post<AcademicYear>(
      '/academic-years',
      payload,
    );
    return data;
  },
};
