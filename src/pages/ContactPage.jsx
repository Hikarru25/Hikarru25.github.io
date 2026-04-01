// ContactPage.jsx — Contact page at route "/contact"
//
// How this page works:
//   1. User fills in name, email, message
//   2. On submit → we validate (client-side, no network needed)
//   3. If valid → we INSERT into Supabase `messages` table
//   4. We show success or error feedback
//
// Key React concept: useState
//   Every piece of data that can CHANGE and needs to UPDATE the screen
//   must live in state. Here we track:
//     - formData   → what the user is typing
//     - fieldErrors → validation errors per field
//     - loading    → is the Supabase call in progress?
//     - success    → did the INSERT succeed?
//     - submitError → did the INSERT fail?

import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import styles from './ContactPage.module.css'

// ─── Validation ───────────────────────────────────────────────────────────────
// Pure function — no React, no side effects, just returns an errors object
// Returns {} if everything is valid, or { fieldName: "error message" } for each issue
function validate({ name, email, message }) {
  const errors = {}

  if (!name.trim()) {
    errors.name = 'Name is required'
  }

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // Regex breakdown: one or more non-space/@ chars, then @, then domain, then .tld
    errors.email = 'Please enter a valid email address'
  }

  if (!message.trim()) {
    errors.message = 'Message is required'
  }

  return errors
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  // formData: tracks the current value of each input field
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // fieldErrors: inline validation errors shown under each field
  const [fieldErrors, setFieldErrors] = useState({})

  // loading: true while the Supabase INSERT is in flight
  const [loading, setLoading] = useState(false)

  // success: true after a successful INSERT — triggers the green banner
  const [success, setSuccess] = useState(false)

  // submitError: holds the error message string if the INSERT fails
  const [submitError, setSubmitError] = useState(null)

  // ── handleChange ────────────────────────────────────────────────────────────
  // Called on every keystroke in any field
  // Uses the input's `name` attribute to know which field to update
  // "computed property name" [e.target.name] lets one handler cover all fields
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear the error for this field as soon as the user starts fixing it
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // ── handleSubmit ─────────────────────────────────────────────────────────────
  // async function — because the Supabase call returns a Promise (it takes time)
  async function handleSubmit(e) {
    e.preventDefault() // Prevent the browser's default "reload page on submit" behavior

    // Step 1: validate
    const errors = validate(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return // Stop here — don't touch Supabase with invalid data
    }

    // Step 2: start loading state
    setLoading(true)
    setSubmitError(null)

    try {
      // Step 3: INSERT into Supabase
      // We only send name, email, message — Supabase generates id and created_at
      const { error } = await supabase
        .from('messages')
        .insert([{ name: formData.name, email: formData.email, message: formData.message }])

      if (error) throw error // If Supabase returns an error, jump to catch block

      // Step 4a: SUCCESS — clear the form, show green banner, auto-hide after 4s
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setFieldErrors({})
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      // Step 4b: FAILURE — show red error, keep form data so user can retry
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      // finally runs whether it succeeded or failed — always stop loading
      setLoading(false)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Get in Touch</h1>
        <p className={styles.pageSubtitle}>
          Have a project in mind or just want to say hello? Fill out the form below.
        </p>
      </section>

      <section className={styles.formSection}>
        {/* ── Success Banner ── */}
        {success && (
          <div className={styles.successBanner} role="status">
            <CheckCircle size={20} />
            <span>Message sent! I'll get back to you soon.</span>
          </div>
        )}

        {/* ── Error Banner ── */}
        {submitError && (
          <div className={styles.errorBanner} role="alert">
            <XCircle size={20} />
            <span>{submitError}</span>
          </div>
        )}

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* noValidate: disables browser's built-in validation popups
              so we can show our own styled error messages instead */}

          {/* Name Field */}
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
              placeholder="Your name"
              autoComplete="name"
            />
            {fieldErrors.name && (
              <span className={styles.fieldError} role="alert">{fieldErrors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {fieldErrors.email && (
              <span className={styles.fieldError} role="alert">{fieldErrors.email}</span>
            )}
          </div>

          {/* Message Field */}
          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.textarea} ${fieldErrors.message ? styles.inputError : ''}`}
              placeholder="What's on your mind?"
              rows={6}
            />
            {fieldErrors.message && (
              <span className={styles.fieldError} role="alert">{fieldErrors.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </section>
    </div>
  )
}

