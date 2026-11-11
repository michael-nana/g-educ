import type { AuthSession, AuthUser } from './auth.types'

const SESSION_KEY = 'geduc_admin_session'
const DEVICE_ID_KEY = 'geduc_admin_device_id'

export function getSession(): AuthSession | null {
  try {
    const value = localStorage.getItem(SESSION_KEY)

    if (!value) return null

    return JSON.parse(value) as AuthSession
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session),
  )
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function getAccessToken(): string | null {
  return getSession()?.accessToken ?? null
}

export function getRefreshToken(): string | null {
  return getSession()?.refreshToken ?? null
}

export function getStoredUser(): AuthUser | null {
  return getSession()?.user ?? null
}

export function updateTokens(
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
): void {
  const session = getSession()

  if (!session) return

  saveSession({
    ...session,
    accessToken,
    refreshToken,
    expiresIn,
  })
}

export function getDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY)

  if (!deviceId) {
    deviceId =
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `device-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`

    localStorage.setItem(DEVICE_ID_KEY, deviceId)
  }

  return deviceId
}

export function getDeviceName(): string {
  const userAgent = navigator.userAgent

  if (/Windows/i.test(userAgent)) return 'Ordinateur Windows'
  if (/Mac/i.test(userAgent)) return 'Ordinateur Mac'
  if (/Android/i.test(userAgent)) return 'Appareil Android'
  if (/iPhone|iPad/i.test(userAgent)) return 'Appareil Apple'

  return 'Navigateur web'
}