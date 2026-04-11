// Header.jsx — Sticky top navigation
// Desktop (>768px): logo + horizontal text nav + theme toggle + language switcher
// Mobile (≤768px): logo + controls — nav moves to bottom (see Footer.jsx)
import { NavLink } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../hooks/useLanguage'
import logo from '../../assets/logo.png'
import styles from './Header.module.css'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { lang, t, toggleLanguage } = useLanguage()

  const navLinks = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/links', label: t('nav.links') },
    { to: '/contact', label: t('nav.contact') },
  ]

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo} aria-label="Jenny's personal logo — go to home">
        <img src={logo} alt="Jenny's personal logo" className={styles.logoImg} />
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

      <div className={styles.controls}>
        {/* Theme toggle: Moon in light mode, Sun in dark mode */}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Language switcher: shows the OTHER language as the clickable label */}
        <button
          className={styles.langToggle}
          onClick={toggleLanguage}
          aria-label="Switch language"
        >
          {lang === 'en' ? 'FR' : 'EN'}
        </button>
      </div>
    </header>
  )
}
