# 🤖 Feature Specification — Multi-Language Support *(Extra Mile)*

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.  
> ⭐ This is an Extra Mile feature — implement only after all main requirements are complete.

---

## 1. Feature Goal & Scope

### Goal
Add support for English and French languages across the entire site. A language switcher accessible on every page allows the user to toggle between languages. All user-facing text is translated, and the language preference is persisted in `localStorage`.

### In Scope
- Support for English (EN) and French (FR)
- Language switcher button in the Header (accessible on every page)
- All user-facing text translated: navigation, headings, paragraphs, buttons, labels, error messages, placeholders
- Language preference persisted in `localStorage`
- Translation files in structured JSON format

### Out of Scope
- More than 2 languages
- Server-side or URL-based language routing (e.g., `/fr/home`)
- Automatic browser language detection (manual toggle only, no auto-redirect)

---

## 2. Requirements Breakdown & User Flow

### User Flow
```
App loads
  ↓
Check localStorage for saved language preference
  ↓
If saved → apply saved language
If not saved → default to English
  ↓
User clicks language switcher (EN | FR) in Header
  ↓
All text on the page instantly switches to selected language
  ↓
Preference saved to localStorage
```

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/i18n/en.json` | Create | English translation strings |
| `src/i18n/fr.json` | Create | French translation strings |
| `src/context/LanguageContext.jsx` | Create | Language state provider |
| `src/hooks/useLanguage.js` | Create | Hook to access language context |
| `src/components/layout/Header.jsx` | Edit | Add language switcher button |
| All page components | Edit | Replace hardcoded strings with `t('key')` |

---

## 4. Translation File Structure

### src/i18n/en.json
```json
{
  "nav": {
    "home": "Home",
    "portfolio": "Portfolio",
    "links": "Links",
    "contact": "Contact"
  },
  "home": {
    "title": "Hi, I'm Jenny",
    "role": "Full Stack Developer | Health Tech Strategist",
    "bio": "For 15 years I worked on the business side of health technology...",
    "techSkillsTitle": "Technical Skills",
    "softSkillsTitle": "Soft Skills & Talents"
  },
  "contact": {
    "title": "Get in Touch",
    "namePlaceholder": "Your Name",
    "emailPlaceholder": "Your Email",
    "messagePlaceholder": "Your Message",
    "submitButton": "Send Message",
    "successMessage": "Message sent! I'll get back to you soon.",
    "errorMessage": "Something went wrong. Please try again.",
    "validationName": "Name is required",
    "validationEmail": "Email is required",
    "validationEmailFormat": "Please enter a valid email address",
    "validationMessage": "Message is required"
  },
  "footer": {
    "copyright": "© 2026 Jenny. All rights reserved."
  }
}
```

### src/i18n/fr.json
```json
{
  "nav": {
    "home": "Accueil",
    "portfolio": "Portfolio",
    "links": "Liens",
    "contact": "Contact"
  },
  "home": {
    "title": "Bonjour, je suis Jenny",
    "role": "Développeuse Full Stack | Stratège en Santé Numérique",
    "bio": "Pendant 15 ans, j'ai travaillé du côté stratégique de la technologie de la santé...",
    "techSkillsTitle": "Compétences Techniques",
    "softSkillsTitle": "Compétences Douces & Talents"
  },
  "contact": {
    "title": "Me Contacter",
    "namePlaceholder": "Votre Nom",
    "emailPlaceholder": "Votre Courriel",
    "messagePlaceholder": "Votre Message",
    "submitButton": "Envoyer le Message",
    "successMessage": "Message envoyé ! Je vous répondrai bientôt.",
    "errorMessage": "Une erreur est survenue. Veuillez réessayer.",
    "validationName": "Le nom est requis",
    "validationEmail": "L'adresse courriel est requise",
    "validationEmailFormat": "Veuillez entrer une adresse courriel valide",
    "validationMessage": "Le message est requis"
  },
  "footer": {
    "copyright": "© 2026 Jenny. Tous droits réservés."
  }
}
```

---

## 5. LanguageContext Implementation

```jsx
// src/context/LanguageContext.jsx
import en from '../i18n/en.json'
import fr from '../i18n/fr.json'

const translations = { en, fr }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')

  const t = (key) => {
    // Supports dot-notation: t('nav.home') → translations[lang].nav.home
    return key.split('.').reduce((obj, k) => obj?.[k], translations[lang]) || key
  }

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'fr' : 'en'
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
```

---

## 6. Language Switcher Button

- Located in the Header (visible on all pages)
- Displays current language and option: e.g., `EN | FR`
- Active language is visually highlighted
- `aria-label="Switch language"` for accessibility

---

## 7. Acceptance Criteria

- [ ] Language switcher is accessible in the Header on every page
- [ ] Clicking the switcher toggles between English and French
- [ ] All navigation labels change language instantly
- [ ] All page headings, paragraphs, buttons, labels, and placeholders change language
- [ ] All validation and feedback messages change language
- [ ] Language preference saved in `localStorage`
- [ ] On app load, saved `localStorage` language preference is applied
- [ ] If no saved preference, English is the default
- [ ] Translation files use structured JSON format (`src/i18n/en.json`, `src/i18n/fr.json`)
- [ ] No hardcoded user-facing strings in components (all use `t('key')`)
- [ ] No console errors
