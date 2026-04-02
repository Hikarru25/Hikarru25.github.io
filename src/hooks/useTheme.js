// useTheme.js — shortcut hook for ThemeContext
// Usage anywhere: const { theme, toggleTheme } = useTheme()
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useTheme() {
  return useContext(ThemeContext)
}
