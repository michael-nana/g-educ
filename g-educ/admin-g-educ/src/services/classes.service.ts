
import { api } from './api';

import type { SchoolClass } from './classes.types';

export const classesService = {
  async findAll(): Promise<SchoolClass[]> {
    const { data } = await api.get<SchoolClass[]>('/classes');
    return data;
  },
};
