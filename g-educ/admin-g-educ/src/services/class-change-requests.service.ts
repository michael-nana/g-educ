import { api } from './api';

import type {
  ClassChangeRequest,
  ClassChangeRequestReviewResult,
  ReviewClassChangeRequestDto,
} from './class-change-requests.types';

export const classChangeRequestsService = {
  async findAll(): Promise<ClassChangeRequest[]> {
    const { data } = await api.get<ClassChangeRequest[]>(
      '/class-change-requests',
    );
    return data;
  },

  async approve(
    id: string,
    payload: ReviewClassChangeRequestDto = {},
  ): Promise<ClassChangeRequestReviewResult> {
    const { data } = await api.post<ClassChangeRequestReviewResult>(
      `/class-change-requests/${id}/approve`,
      payload,
    );
    return data;
  },

  async reject(
    id: string,
    payload: ReviewClassChangeRequestDto = {},
  ): Promise<ClassChangeRequestReviewResult> {
    const { data } = await api.post<ClassChangeRequestReviewResult>(
      `/class-change-requests/${id}/reject`,
      payload,
    );
    return data;
  },
};
