// useAuth.js — Custom hook to access auth context
//
// WHY a custom hook?
//   Instead of writing this in every component that needs auth:
//     import { useContext } from 'react'
//     import { AuthContext } from '../context/AuthContext'
//     const { session, loading } = useContext(AuthContext)
//
//   You just write:
//     import { useAuth } from '../hooks/useAuth'
//     const { session, loading } = useAuth()
//
//   It's the same thing — just cleaner and easier to refactor later.
//   If you ever change AuthContext's location, you fix it in one place.

import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  return useContext(AuthContext)
}
