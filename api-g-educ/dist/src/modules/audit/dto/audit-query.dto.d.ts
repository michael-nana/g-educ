export declare class AuditQueryDto {
    userId?: string;
    entityType?: string;
    entityId?: string;
    action?: string;
    from?: string;
    to?: string;
    page: number;
    limit: number;
}
