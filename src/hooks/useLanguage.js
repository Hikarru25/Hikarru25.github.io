// useLanguage.js — shortcut hook for LanguageContext
// Usage anywhere: const { lang, t, toggleLanguage } = useLanguage()
import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export function useLanguage() {
  return useContext(LanguageContext)
}
