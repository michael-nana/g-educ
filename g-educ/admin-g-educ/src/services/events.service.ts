import { api } from './api';

import type {
  CreateEventDto,
  EventFilters,
  SchoolEvent,
  UpdateEventDto,
} from './events.types';

export const eventsService = {
  async findAll(filters: EventFilters = {}): Promise<SchoolEvent[]> {
    const { data } = await api.get<SchoolEvent[]>('/events', {
      params: filters,
    });
    return data;
  },

  async create(payload: CreateEventDto): Promise<SchoolEvent> {
    const { data } = await api.post<SchoolEvent>('/events', payload);
    return data;
  },

  async update(id: string, payload: UpdateEventDto): Promise<SchoolEvent> {
    const { data } = await api.patch<SchoolEvent>(`/events/${id}`, payload);
    return data;
  },

  async archive(id: string): Promise<SchoolEvent> {
    const { data } = await api.delete<SchoolEvent>(`/events/${id}`);
    return data;
  },
};
