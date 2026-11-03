
import type { Role, UserStatus } from '../../generated/prisma/client';
import type { ClsStore as NestClsStore } from 'nestjs-cls';

export interface ClsStore extends NestClsStore {
  userId?: string;
  role?: Role;
  classId?: string | null;
  status?: UserStatus;
  canPublish?: boolean;
  ipAddress?: string;
}
