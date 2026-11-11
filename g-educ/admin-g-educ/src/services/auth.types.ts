export type UserRole =
  | 'ELEVE'
  | 'ENSEIGNANT'
  | 'ADMINISTRATEUR'

export interface AuthUser {
  id: string
  phone: string
  role: UserRole
  status: string
  canPublish: boolean
  mustChangePassword: boolean
  studentProfile: {
    displayName: string
    classId: string
  } | null
}

export interface LoginCredentials {
  phone: string
  password: string
  deviceId: string
  deviceName?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginResponse extends AuthTokens {
  message: string
  user: AuthUser
}

export type RefreshResponse = AuthTokens

export interface LogoutResponse {
  message: string
}

export interface AuthSession {
  user: AuthUser
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface ApiErrorResponse {
  statusCode?: number
  message?: string | string[]
  error?: string
  path?: string
  timestamp?: string
}