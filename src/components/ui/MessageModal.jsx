// MessageModal.jsx — Full message viewer
//
// Receives a `message` object and an `onClose` callback as props.
//
// Three ways to close (spec requirement):
//   1. X button click
//   2. Clicking the dark overlay behind the modal (backdrop click)
//   3. Pressing the Escape key
//
// The `onClose` function is defined in BackOfficePage and simply
// sets `selectedMessage` back to null, which unmounts this component.

import { useEffect } from 'react'
import styles from './MessageModal.module.css'

export default function MessageModal({ message, onClose }) {
  // --- Escape key listener ---
  // Added on mount, removed on unmount (cleanup function)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Format the ISO timestamp to a readable local date/time string
  // Example: "2025-04-01T14:32:00Z" → "4/1/2025, 2:32:00 PM"
  const formattedDate = new Date(message.created_at).toLocaleString()

  // --- Backdrop click handler ---
  // The overlay div covers the full screen. Clicking it fires onClose.
  // IMPORTANT: we stop propagation on the modal box itself so clicking
  // inside the modal doesn't bubble up and accidentally close it.
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Message details"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row: title + close button */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Message Details</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Sender info */}
        <div className={styles.field}>
          <span className={styles.label}>From</span>
          <span className={styles.value}>{message.name}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Email</span>
          <a
            href={`mailto:${message.email}`}
            className={styles.emailLink}
          >
            {message.email}
          </a>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Received</span>
          <span className={styles.value}>{formattedDate}</span>
        </div>

        {/* Full message body */}
        <div className={styles.messageBody}>
          <span className={styles.label}>Message</span>
          <p className={styles.messageText}>{message.message}</p>
        </div>
      </div>
    </div>
  )
}
