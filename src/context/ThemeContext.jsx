// ThemeContext.jsx — Global light/dark theme state
//
// HOW it works:
//   1. getInitialTheme() runs BEFORE first render:
//      - checks localStorage for a saved preference
//      - if nothing saved → checks the OS preference via matchMedia
//   2. useEffect fires whenever `theme` changes:
//      - sets data-theme="light" or "dark" on <html>
//      - this is what our CSS [data-theme="dark"] rules read
//      - saves the new preference to localStorage
//   3. toggleTheme() just flips 'light' ↔ 'dark'
//
// WHY data-theme on <html>?
//   It overrides the @media (prefers-color-scheme) in index.css,
//   so a manual click always wins over the OS setting.

import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext(null)

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  return 'dark' // default to dark mode on first visit
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
