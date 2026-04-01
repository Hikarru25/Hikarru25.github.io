// AuthContext.jsx — Global authentication state
//
// WHY Context?
//   The login session needs to be accessible in multiple places:
//   - LoginPage (to redirect if already logged in)
//   - BackOfficePage (to protect the route)
//   - Header (optional: show logout button)
//
//   Without Context, you'd have to pass `session` as a prop
//   through every component — called "prop drilling", which gets messy fast.
//   Context lets any component grab the session directly.
//
// HOW it works:
//   1. AuthProvider wraps the whole app (in main.jsx)
//   2. It calls supabase.auth.getSession() once on mount to check if
//      the user is already logged in (e.g. after a page refresh)
//   3. It listens for auth changes (login, logout) via onAuthStateChange
//   4. Any component can call useAuth() to get { session, loading }

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// createContext creates the "container" — starts as null
const AuthContext = createContext(null)

// AuthProvider: wrap your app with this to give all children access to auth state
export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined) // undefined = "not checked yet"
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Step 1: Check if there's already a session (e.g. user refreshed the page)
    // Supabase stores the session in localStorage automatically
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Step 2: Listen for future auth changes (login / logout events)
    // This fires automatically when signInWithPassword succeeds or signOut is called
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    // Cleanup: unsubscribe when the component unmounts
    // This prevents memory leaks
    return () => subscription.unsubscribe()
  }, []) // Empty array = run once on mount only

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the context so useAuth.js can read it
export { AuthContext }
