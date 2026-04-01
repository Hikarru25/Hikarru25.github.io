// ProtectedRoute.jsx — Auth guard wrapper
//
// WHY a separate component?
//   Instead of copy-pasting the "redirect if not logged in" logic into every
//   protected page, we wrap the route once in App.jsx.
//   Clean, reusable, single responsibility.
//
// HOW it works:
//   1. It reads { session, loading } from AuthContext via useAuth()
//   2. While Supabase is still checking localStorage → show a loading screen
//      (prevents the page from flashing /login briefly before session loads)
//   3. If no session → <Navigate> sends the user to /login
//      `replace` means the back button won't return to /backoffice
//   4. If session exists → render whatever children were passed in
//
// USAGE in App.jsx:
//   <Route path="/backoffice" element={
//     <ProtectedRoute><MainLayout><BackOfficePage /></MainLayout></ProtectedRoute>
//   } />

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  // Still checking auth state (e.g. page refresh — Supabase reads localStorage)
  // Show nothing (or a spinner) to avoid a flash redirect
  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  // No active session → send to login
  // `replace` prevents the browser back button from bouncing back to /backoffice
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // Authenticated → render the protected page
  return children
}
