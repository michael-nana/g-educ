
import axios from 'axios';

import { api } from './api';

import {
  clearSession,
  getDeviceId,
  getDeviceName,
  getRefreshToken,
  saveSession,
} from './auth-storage';

import type {
  LoginResponse,
  LogoutResponse,
  RefreshResponse,
} from './auth.types';

export const authService = {
  async login(credentials: {
    phone: string;
    password: string;
  }): Promise<LoginResponse> {
    const body = {
      phone: credentials.phone,
      password: credentials.password,
      deviceId: getDeviceId(),
      deviceName: getDeviceName(),
    };

    const response = await api.post<LoginResponse>(
      '/auth/login',
      body,
    );

    return response.data;
  },

  async refresh(): Promise<RefreshResponse> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error('Aucune session à renouveler');
    }

    const response = await axios.post<RefreshResponse>(
      `${import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/v1'}/auth/refresh`,
      { refreshToken },
      { timeout: 15000 },
    );

    return response.data;
  },

  async logout(): Promise<void> {
    const refreshToken = getRefreshToken();

    try {
      if (refreshToken) {
        await api.post<LogoutResponse>(
          '/auth/logout',
          { refreshToken },
        );
      }
    } finally {
      clearSession();
    }
  },

  saveLoginSession(data: LoginResponse): void {
    saveSession({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
    });
  },

  async rejectNonAdminSession(
    refreshToken: string,
  ): Promise<void> {
    try {
      await api.post('/auth/logout', { refreshToken });
    } catch {
      // La session est rejetée côté frontend même si
      // la révocation réseau échoue.
    } finally {
      clearSession();
    }
  },
};
