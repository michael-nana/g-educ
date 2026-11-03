import type { Role } from '../../../generated/prisma/client';

export interface JwtPayload {
  sub: string;
  role: Role;
}