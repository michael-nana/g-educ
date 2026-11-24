import { ClsService } from 'nestjs-cls';
import type { ClsStore } from './cls-store.interface';
export declare class ClsContextService {
    private readonly cls;
    constructor(cls: ClsService<ClsStore>);
    get userId(): string | undefined;
    get role(): ClsStore['role'];
    get classId(): string | null | undefined;
    get status(): ClsStore['status'];
    get canPublish(): boolean | undefined;
    get ipAddress(): string | undefined;
    setUserContext(context: Pick<ClsStore, 'userId' | 'role' | 'classId' | 'status' | 'canPublish'>): void;
}
