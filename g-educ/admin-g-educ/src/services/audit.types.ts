export interface AuditQuery {
  action?: string;
  entityType?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface AuditActor {
  phone: string;
  studentProfile: {
    displayName: string;
  } | null;
}

export interface AuditLog {
  id: string;
  userId: string | null;
  role: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  before: unknown;
  after: unknown;
  ipAddress: string | null;
  createdAt: string;
  user: AuditActor | null;
}

export interface AuditListResponse {
  data: AuditLog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
