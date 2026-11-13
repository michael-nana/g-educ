export type EventType = 'EXAMEN' | 'DEVOIR' | 'AUTRE';
export type EventStatus = 'BROUILLON' | 'PUBLIE' | 'ARCHIVE';

export interface SchoolEvent {
  id: string;
  classId: string;
  type: EventType;
  title: string;
  description: string | null;
  subjectId: string | null;
  startsAt: string;
  endsAt: string | null;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  subject?: {
    id: string;
    name: string;
  } | null;
  class?: {
    id: string;
    code: string;
    label: string;
  };
}

export interface EventFilters {
  from?: string;
  to?: string;
  type?: EventType;
}

export interface CreateEventDto {
  classId: string;
  type: EventType;
  title: string;
  description?: string;
  subjectId?: string;
  startsAt: string;
  endsAt?: string;
}

export interface UpdateEventDto {
  type?: EventType;
  title?: string;
  description?: string | null;
  subjectId?: string | null;
  startsAt?: string;
  endsAt?: string | null;
}
