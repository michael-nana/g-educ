import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { authService } from '../services/auth.service'
import {
  clearSession,
  getStoredUser,
} from '../services/auth-storage'

import type { AuthUser } from '../services/auth.types'

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (phone: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<AuthUser | null>(
    () => getStoredUser(),
  )


  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      setUser(null)
      clearSession()
    }
  }, [])

  const login = useCallback(
    async (phone: string, password: string) => {
      const response = await authService.login({
        phone,
        password,
      })

      if (response.user.role !== 'ADMINISTRATEUR') {
        await authService.rejectNonAdminSession(
          response.refreshToken,
        )

        throw new Error(
          "Accès refusé : ce compte n'est pas administrateur.",
        )
      }

      authService.saveLoginSession(response)
      setUser(response.user)
    },
    [],
  )

  useEffect(() => {
    const handleExpiredSession = () => {
      clearSession()
      setUser(null)
    }

    window.addEventListener(
      'geduc:session-expired',
      handleExpiredSession,
    )

    return () => {
      window.removeEventListener(
        'geduc:session-expired',
        handleExpiredSession,
      )
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading: false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth doit être utilisé dans AuthProvider',
    )
  }

  return context
}