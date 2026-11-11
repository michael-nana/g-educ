
import { api } from './api';

import type {
  UsersQuery,
  UsersListResponse,
  UserDetails,
  UpdateUserDto,
  UpdateUserResponse,
  UserStatusResponse,
  CreateStaffDto,
  CreateStaffResponse,
} from './users.types';

export const usersService = {
  async list(params: UsersQuery = {}): Promise<UsersListResponse> {
    const { data } = await api.get<UsersListResponse>('/users', {
      params,
    });

    return data;
  },
  async createStaff(payload: CreateStaffDto): Promise<CreateStaffResponse> {
  const { data } = await api.post<CreateStaffResponse>(
    '/users/staff',
    payload,
  );

  return data;
},

  async findOne(id: string): Promise<UserDetails> {
    const { data } = await api.get<UserDetails>(`/users/${id}`);

    return data;
  },

  async update(
    id: string,
    payload: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    const { data } = await api.patch<UpdateUserResponse>(
      `/users/${id}`,
      payload,
    );

    return data;
  },

  async suspend(id: string): Promise<UserStatusResponse> {
    const { data } = await api.post<UserStatusResponse>(
      `/users/${id}/suspend`,
    );

    return data;
  },

  async reactivate(id: string): Promise<UserStatusResponse> {
    const { data } = await api.post<UserStatusResponse>(
      `/users/${id}/reactivate`,
    );

    return data;
  },
};
