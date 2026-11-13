import { api } from './api';

import type {
  AnnouncementResult,
  CreateAnnouncementDto,
} from './announcements.types';

export const announcementsService = {
  async create(payload: CreateAnnouncementDto): Promise<AnnouncementResult> {
    const { data } = await api.post<AnnouncementResult>(
      '/notifications/announcements',
      payload,
    );
    return data;
  },
};
