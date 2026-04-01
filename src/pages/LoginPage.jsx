// LoginPage.jsx — Secret login page at route "/login"
// NOT linked in any public navigation — accessed by typing /login in the URL bar
//
// Flow:
//   1. If already logged in → redirect to /backoffice immediately
//   2. Otherwise → show the login form
//   3. On submit → call supabase.auth.signInWithPassword()
//   4. On success → navigate to /backoffice
//   5. On failure → show red error message

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../hooks/useAuth'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { session, loading } = useAuth()
  // useNavigate: React Router v6 hook to redirect programmatically
  // navigate('/backoffice') works like clicking a link but from inside JS
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // If session already exists (already logged in), redirect immediately
  // This handles the case where the user types /login after already being authenticated
  useEffect(() => {
    if (!loading && session) {
      navigate('/backoffice', { replace: true })
      // replace: true → replaces the current history entry so the back button
      // doesn't bring them back to /login
    }
  }, [session, loading, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    setSubmitting(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      // Supabase returns "Invalid login credentials" for wrong email/password
      setError('Invalid login credentials. Please try again.')
      setSubmitting(false)
    }
    // On success: onAuthStateChange in AuthContext fires automatically,
    // updates the session, the useEffect above catches it and redirects
  }

  // Show nothing while checking the existing session (avoids flash of login form)
  if (loading) return null

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>This page is not publicly linked.</p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="admin@codeboxx.com"
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className={styles.error} role="alert">{error}</p>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

