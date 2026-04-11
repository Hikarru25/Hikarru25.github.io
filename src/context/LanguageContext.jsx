// LanguageContext.jsx — Global EN/FR language state
//
// HOW it works:
//   1. On load: reads localStorage for saved 'lang' — defaults to 'en'
//   2. t('nav.home') uses dot-notation to resolve the key:
//      key.split('.') → ['nav', 'home']
//      reduce walks the JSON object → translations['en']['nav']['home'] → "Home"
//      Falls back to the key itself if missing, so the UI never shows blank text
//   3. toggleLanguage() flips 'en' ↔ 'fr' and saves to localStorage

import { createContext, useState } from 'react'
import en from '../i18n/en.json'
import fr from '../i18n/fr.json'

export const LanguageContext = createContext(null)

const translations = { en, fr }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')

  function t(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations[lang]) ?? key
  }

  function toggleLanguage() {
    const next = lang === 'en' ? 'fr' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
