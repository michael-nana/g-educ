import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useAuth } from '../../context/AuthContext'
import type { ApiErrorResponse } from '../../services/auth.types'

import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()

  const { login, isAuthenticated } = useAuth()

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      await login(phone.trim(), password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
        console.error('[LOGIN PAGE] Erreur de connexion :', err)
      if (err instanceof Error && err.message.startsWith('Accès refusé')) {
        setError(err.message)
      } else if (axios.isAxiosError<ApiErrorResponse>(err)) {
        const message = err.response?.data?.message

        setError(
          Array.isArray(message)
            ? message.join(', ')
            : message || 'Connexion impossible. Vérifiez vos identifiants.',
        )
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Une erreur inattendue est survenue.',
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="login-logo">G</div>

          <div>
            <h1>G-EDUC</h1>
            <p>Administration</p>
          </div>
        </div>

        <div className="login-heading">
          <h2>Bienvenue</h2>
          <p>
            Connectez-vous à votre espace d'administration.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="phone">
              Numéro de téléphone
            </label>

            <input
              id="phone"
              type="tel"
              placeholder="+22670123456"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">
              Mot de passe
            </label>

            <div className="password-input">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                minLength={8}
                maxLength={72}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                aria-label={
                  showPassword
                    ? 'Masquer le mot de passe'
                    : 'Afficher le mot de passe'
                }
              >
                {showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading || !phone.trim() || !password}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div className="login-footer">
          <span className="login-security-dot" />
          Connexion sécurisée
        </div>
      </section>

      <p className="login-copyright">
        © {new Date().getFullYear()} G-EDUC — Plateforme
        d'apprentissage
      </p>
    </main>
  )
}