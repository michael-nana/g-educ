import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export interface AuthenticatedUser {
  id: string;
  role: string;
  status: string;
  canPublish: boolean;
  classId: string | null;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedUser => {
    const request = context
      .switchToHttp()
      .getRequest<{ user: AuthenticatedUser }>();

    return request.user;
  },
);