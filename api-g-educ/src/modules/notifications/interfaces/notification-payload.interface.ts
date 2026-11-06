import type { NotificationType } from '../../../generated/prisma/client';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}