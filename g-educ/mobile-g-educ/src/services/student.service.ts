import { api } from './api';
import type { ActivityCalendar, Assessment, AttemptDetail, AttemptSummary, Chapter, ClassItem, ClassSubject, Lesson, NotificationList, ProgressLesson, ProgressOverview, SchoolEvent, StudySession, User } from './types';

const query = (params: Record<string, string | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value) search.set(key, value); });
  const suffix = search.toString();
  return suffix ? '?' + suffix : '';
};

export const studentService = {
  me: () => api.get<User>('/me'),
  updateProfile: (data: { displayName?: string; schoolName?: string }) => api.patch<User>('/me/profile', data),
  classes: () => api.get<ClassItem[]>('/classes'),
  subjects: () => api.get<ClassSubject[]>('/me/subjects'),
  chapters: (classSubjectId?: string) => api.get<Chapter[]>('/me/chapters' + query({ classSubjectId })),
  lessons: (filters: { chapterId?: string; classSubjectId?: string; type?: string; favorite?: boolean } = {}) => api.get<Lesson[]>('/lessons' + query({ ...filters, favorite: filters.favorite === undefined ? undefined : String(filters.favorite) })),
  lesson: (id: string) => api.get<Lesson>('/lessons/' + id),
  progressLessons: () => api.get<ProgressLesson[]>('/me/progress/lessons'),
  progressOverview: () => api.get<ProgressOverview>('/me/progress'),
  subjectProgress: (classSubjectId: string) => api.get<ProgressOverview['subjects'][number]>('/me/progress/subjects/' + classSubjectId),
  setFavorite: (id: string, favorite: boolean) => favorite ? api.put('/lessons/' + id + '/favorite') : api.delete('/lessons/' + id + '/favorite'),
  saveLessonProgress: (id: string, body: { progressPercent: number; lastPositionSeconds?: number; clientId: string }) => api.put<{ completed?: boolean; newlyCompleted?: boolean; activity?: { streakUpdated?: boolean; currentStreak?: number }; streak?: { currentStreak?: number; longestStreak?: number } }>('/lessons/' + id + '/progress', body),
  assessments: (chapterId?: string) => api.get<Assessment[]>('/assessments' + query({ chapterId })),
  assessment: (id: string) => api.get<Assessment>('/assessments/' + id),
  exerciseCorrection: (id: string) => api.get<{ name: string; downloadUrl: string }>('/assessments/' + id + '/correction'),
  submitAttempt: (id: string, body: { clientId: string; startedAt: string; answers: Array<{ questionId: string; optionIds: string[]; responseText?: string }> }) => api.post<AttemptDetail>('/assessments/' + id + '/attempts', body),
  attempts: (assessmentId?: string) => api.get<AttemptSummary[]>('/me/attempts' + query({ assessmentId })),
  attempt: (id: string) => api.get<AttemptDetail>('/me/attempts/' + id),
  streak: () => api.get<{ currentStreak?: number; longestStreak?: number }>('/me/streak'),
  activity: (from?: string, to?: string) => api.get<ActivityCalendar>('/me/activity' + query({ from, to })),
  sessions: (from?: string, to?: string) => api.get<StudySession[]>('/study-sessions' + query({ from, to })),
  createSession: (body: { clientId: string; title: string; startsAt: string; endsAt: string; subjectId?: string }) => api.post<StudySession>('/study-sessions', body),
  updateSession: (id: string, body: Partial<StudySession>) => api.patch<StudySession>('/study-sessions/' + id, body),
  deleteSession: (id: string) => api.delete('/study-sessions/' + id),
  events: (from?: string, to?: string) => api.get<SchoolEvent[]>('/events' + query({ from, to })),
  notifications: (page = 1, limit = 20) => api.get<NotificationList>('/me/notifications' + query({ page: String(page), limit: String(limit) })),
  readNotification: (id: string) => api.post('/me/notifications/' + id + '/read'),
  readAllNotifications: () => api.post('/me/notifications/read-all'),
  notificationPreferences: () => api.get<Record<string, unknown>>('/me/notification-preferences'),
  updateNotificationPreferences: (body: Record<string, boolean | string>) => api.put('/me/notification-preferences', body),
  registerDevice: (body: { token: string; platform: 'ANDROID' | 'IOS'; appVersion?: string }) => api.post('/me/devices', body),
  removeDevice: (token: string) => api.delete('/me/devices/' + encodeURIComponent(token)),
  requestClassChange: (toClassId: string, note: string) => api.post('/me/class-change-requests', { toClassId, note }),
  changePassword: (body: { currentPassword: string; newPassword: string }) => api.patch('/auth/change-password', body),
  deleteAccount: () => api.delete('/me'),
};




