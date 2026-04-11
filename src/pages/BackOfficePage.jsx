// BackOfficePage.jsx — Protected admin panel
//
// This page has two concerns:
//   1. Data management: fetch, display, and delete messages from Supabase
//   2. Session management: logout + redirect
//
// STATE MAP:
//   messages     → array of message objects from the DB (or [])
//   pageLoading  → true while the initial fetch is running
//   fetchError   → string if the SELECT query fails, null otherwise
//   deletingId   → id of the message currently being deleted (shows spinner on that row)
//   deleteError  → string if a DELETE query fails, null otherwise
//   selectedMsg  → the full message object to show in the modal (null = modal closed)
//
// OPTIMISTIC DELETE:
//   We remove the row from local state immediately when Delete is clicked,
//   before the Supabase call completes. This makes the UI feel instant.
//   If the DB call fails, we put the row back and show an error.

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabaseClient'
import MessageModal from '../components/ui/MessageModal'
import styles from './BackOfficePage.module.css'

export default function BackOfficePage() {
  const { session } = useAuth()
  const navigate = useNavigate()

  const [messages, setMessages] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState(null)
  const [selectedMsg, setSelectedMsg] = useState(null)

  // ─── Fetch messages on mount ───────────────────────────────────────────────
  useEffect(() => {
    async function fetchMessages() {
      setPageLoading(true)
      setFetchError(null)

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setFetchError('Failed to load messages. Please try again.')
      } else {
        setMessages(data)
      }

      setPageLoading(false)
    }

    fetchMessages()
  }, []) // Runs once on mount

  // ─── Delete handler ────────────────────────────────────────────────────────
  async function handleDelete(id) {
    setDeleteError(null)

    // Optimistic update: remove from UI immediately so it feels instant
    const previousMessages = messages
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
    setDeletingId(id)

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (error) {
      // Rollback: put the messages back and show the error
      setMessages(previousMessages)
      setDeleteError(`Failed to delete message. Please try again.`)
    }

    setDeletingId(null)
  }

  // ─── Logout handler ───────────────────────────────────────────────────────
  async function handleLogout() {
    await supabase.auth.signOut()
    // AuthContext's onAuthStateChange listener will set session to null.
    // We navigate to home — the user will see the public site.
    navigate('/')
  }

  // ─── Format date helper ───────────────────────────────────────────────────
  // Converts ISO string to "MM/DD/YYYY HH:MM" (local time)
  function formatDate(isoString) {
    const d = new Date(isoString)
    const date = d.toLocaleDateString('en-US')
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    return `${date} ${time}`
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Back Office</h1>
          <p className={styles.subtitle}>
            Logged in as <strong>{session?.user?.email}</strong>
          </p>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Messages section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Contact Messages
          {messages.length > 0 && (
            <span className={styles.badge}>{messages.length}</span>
          )}
        </h2>

        {/* Delete error banner (shows if a single delete fails) */}
        {deleteError && (
          <p className={styles.errorBanner}>{deleteError}</p>
        )}

        {/* ── Loading state ── */}
        {pageLoading && (
          <p className={styles.stateMessage}>Loading messages...</p>
        )}

        {/* ── Fetch error state ── */}
        {!pageLoading && fetchError && (
          <p className={styles.errorBanner}>{fetchError}</p>
        )}

        {/* ── Empty state ── */}
        {!pageLoading && !fetchError && messages.length === 0 && (
          <p className={styles.stateMessage}>No messages yet.</p>
        )}

        {/* ── Table: only rendered when there are messages ── */}
        {!pageLoading && !fetchError && messages.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className={styles.row}>
                    <td>{msg.name}</td>
                    <td>
                      <a
                        href={`mailto:${msg.email}`}
                        className={styles.emailLink}
                      >
                        {msg.email}
                      </a>
                    </td>
                    <td className={styles.dateCell}>{formatDate(msg.created_at)}</td>
                    <td className={styles.actionsCell}>
                      {/* View button → opens the modal with this message */}
                      <button
                        className={styles.viewButton}
                        onClick={() => setSelectedMsg(msg)}
                        aria-label={`View message from ${msg.name}`}
                      >
                        View
                      </button>

                      {/* Delete button → optimistic delete */}
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(msg.id)}
                        disabled={deletingId === msg.id}
                        aria-label={`Delete message from ${msg.name}`}
                      >
                        {deletingId === msg.id ? '...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Message modal — only mounts when a message is selected */}
      {selectedMsg && (
        <MessageModal
          message={selectedMsg}
          onClose={() => setSelectedMsg(null)}
        />
      )}
    </div>
  )
}
