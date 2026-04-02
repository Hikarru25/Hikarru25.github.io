// Header.jsx — Sticky top navigation
// Desktop (>768px): logo + horizontal text nav + theme toggle
// Mobile (≤768px): logo + theme toggle — nav moves to bottom (see Footer.jsx)
import { NavLink } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import styles from './Header.module.css'

// TODO: Replace logoPlaceholder with your AI-generated logo image
// Example: import logo from '../../assets/logo.png'
// Document the AI tool used to generate it here

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/links', label: 'Links' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo} aria-label="Jenny's personal logo — go to home">
        {/* Replace this div with: <img src={logo} alt="Jenny's personal logo" className={styles.logoImg} /> */}
        <div className={styles.logoPlaceholder}>J</div>
      </NavLink>

      <nav className={styles.nav} aria-label="Main navigation">
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Theme toggle: shows Moon in light mode, Sun in dark mode */}
      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}
