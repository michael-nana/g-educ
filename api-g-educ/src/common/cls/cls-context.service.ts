
import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import type { ClsStore } from './cls-store.interface';

@Injectable()
export class ClsContextService {
  constructor(
    private readonly cls: ClsService<ClsStore>,
  ) {}

  get userId(): string | undefined {
    return this.cls.get('userId');
  }

  get role(): ClsStore['role'] {
    return this.cls.get('role');
  }

  get classId(): string | null | undefined {
    return this.cls.get('classId');
  }

  get status(): ClsStore['status'] {
    return this.cls.get('status');
  }

  get canPublish(): boolean | undefined {
    return this.cls.get('canPublish');
  }

  get ipAddress(): string | undefined {
    return this.cls.get('ipAddress');
  }

  setUserContext(context: Pick<
    ClsStore,
    'userId' | 'role' | 'classId' | 'status' | 'canPublish'
  >): void {
    this.cls.set('userId', context.userId);
    this.cls.set('role', context.role);
    this.cls.set('classId', context.classId);
    this.cls.set('status', context.status);
    this.cls.set('canPublish', context.canPublish);
  }
}
