import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useAuth } from '../../context/AuthContext'
import type { ApiErrorResponse } from '../../services/auth.types'

import './LoginPage.css'

const COUNTRY_CODE = '+226'
const ROLES = ['Administrateur', 'Enseignant', 'Modérateur']

/** Garde uniquement les chiffres (8 max) et formate : 76 45 22 10 */
function formatLocalPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  return digits.replace(/(\d{2})(?=\d)/g, '$1 ')
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const localDigits = phone.replace(/\D/g, '')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      // Envoie le numéro complet : +22676452210
      await login(`${COUNTRY_CODE}${localDigits}`, password)
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
      <div className="login-frame">
        <header className="login-logo">G-educ</header>

        <section className="login-hero">
          <h1>
            Back-office
            <em>de la plateforme.</em>
          </h1>
          <p>
            Contenus, événements, modération et comptes des 13 classes, de la
            6e à la Terminale.
          </p>
        </section>

        <ul className="login-roles">
          {ROLES.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>

        <section className="login-card">
          <h2>Connexion</h2>
          <p className="login-card-intro">
            Réservée au personnel. Les comptes sont créés par un administrateur.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="phone">Numéro de téléphone</label>

              <div className="login-input">
                <span className="login-input-icon"><PhoneIcon /></span>
                <span className="login-prefix">{COUNTRY_CODE}</span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="76 45 22 10"
                  value={phone}
                  onChange={(event) =>
                    setPhone(formatLocalPhone(event.target.value))
                  }
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Mot de passe</label>

              <div className="login-input">
                <span className="login-input-icon"><LockIcon /></span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  minLength={8}
                  maxLength={72}
                  required
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword
                      ? 'Masquer le mot de passe'
                      : 'Afficher le mot de passe'
                  }
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="login-check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>Rester connecté</span>
              </label>

              <button type="button" className="login-forgot">
                Mot de passe oublié
              </button>
            </div>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading || localDigits.length < 8 || !password}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <p className="login-note">
            Première connexion : tu devras remplacer ton mot de passe
            temporaire. Après 5 échecs, le compte est bloqué un moment.
          </p>
        </section>
      </div>
    </main>
  )
}