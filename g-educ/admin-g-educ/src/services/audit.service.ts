import { api } from './api';

import type {
  AuditListResponse,
  AuditQuery,
} from './audit.types';

export const auditService = {
  async findAll(query: AuditQuery = {}): Promise<AuditListResponse> {
    const { data } = await api.get<AuditListResponse>('/audit', {
      params: query,
    });
    return data;
  },
};
