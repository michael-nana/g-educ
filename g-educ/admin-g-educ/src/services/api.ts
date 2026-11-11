
import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  updateTokens,
} from './auth-storage';

import type { RefreshResponse } from './auth.types';

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3001/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Client indépendant : évite de déclencher
// l'intercepteur de renouvellement sur /auth/refresh.
const refreshClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

let refreshPromise: Promise<string> | null = null;

function expireSession(): void {
  clearSession();

  window.dispatchEvent(
    new Event('geduc:session-expired'),
  );
}

// Ajouter automatiquement le token d'accès.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

// Gestion centralisée des réponses et erreurs.
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? '';

    // Ne jamais tenter de renouveler un token
    // pendant les opérations d'authentification.
    const isAuthRequest =
      url.includes('/auth/login') ||
      url.includes('/auth/refresh') ||
      url.includes('/auth/logout');

    if (isAuthRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      expireSession();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Mutualiser le renouvellement si plusieurs
      // requêtes reçoivent simultanément une erreur 401.
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post<RefreshResponse>('/auth/refresh', {
            refreshToken,
          })
          .then(({ data }) => {
            updateTokens(
              data.accessToken,
              data.refreshToken,
              data.expiresIn,
            );

            return data.accessToken;
          })
          .catch((refreshError: unknown) => {
            // Une réponse 401 ou 403 signifie que
            // le refresh token n'est plus accepté.
            if (
              axios.isAxiosError(refreshError) &&
              (
                refreshError.response?.status === 401 ||
                refreshError.response?.status === 403
              )
            ) {
              expireSession();
            }

            throw refreshError;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      // Rejouer la requête initiale avec le nouveau token.
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
