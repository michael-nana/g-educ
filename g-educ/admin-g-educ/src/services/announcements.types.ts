export interface CreateAnnouncementDto {
  classId?: string;
  title: string;
  body: string;
}

export interface AnnouncementResult {
  message: string;
  created: number;
  pushSent: number;
}
