# 🤖 Feature Specification — Light & Dark Mode *(Extra Mile)*

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.  
> ⭐ This is an Extra Mile feature — implement only after all main requirements are complete.

---

## 1. Feature Goal & Scope

### Goal
Add a light/dark theme toggle accessible on every page. The theme preference persists in `localStorage`, respects the user's OS/browser preference as the default, and applies smooth transitions when switching.

### In Scope
- Toggle button/switch visible on every page (in Header)
- CSS custom properties for all theme-dependent colors
- `localStorage` persistence of theme preference
- `prefers-color-scheme` media query as the initial default
- Smooth CSS transition when switching themes
- All components and pages support both themes

### Out of Scope
- Per-component theme overrides
- Theme selection beyond light and dark

---

## 2. Requirements Breakdown & User Flow

### User Flow
```
App loads
  ↓
Check localStorage for saved theme preference
  ↓
If saved → apply saved theme
If not saved → check prefers-color-scheme
  → dark → apply dark theme
  → light (or no preference) → apply light theme
  ↓
User clicks toggle in Header
  ↓
Theme switches instantly with smooth transition
  ↓
New preference saved to localStorage
```

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/context/ThemeContext.jsx` | Create | Theme state provider |
| `src/hooks/useTheme.js` | Create | Hook to access theme context |
| `src/components/layout/Header.jsx` | Edit | Add theme toggle button |
| `src/index.css` | Edit | Add CSS custom properties for both themes |
| All CSS Module files | Edit | Use CSS variables instead of hardcoded colors |

---

## 4. CSS Custom Properties

### Root Variables
```css
/* Light theme (default) */
:root[data-theme="light"] {
  --color-bg: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #555555;
  --color-accent: #2563eb;
  --color-border: #e5e7eb;
  --color-card-bg: #ffffff;
  --color-header-bg: #ffffff;
  --color-footer-bg: #f9fafb;
}

/* Dark theme */
:root[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-accent: #60a5fa;
  --color-border: #334155;
  --color-card-bg: #1e293b;
  --color-header-bg: #0f172a;
  --color-footer-bg: #0f172a;
}
```

### Transition
```css
*, *::before, *::after {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

---

## 5. ThemeContext Implementation

```jsx
// src/context/ThemeContext.jsx
const getInitialTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
```

---

## 6. Toggle Button

- Located in the `Header` (visible on all pages)
- Uses Lucide icons: `<Sun />` for light mode, `<Moon />` for dark mode
- `aria-label="Toggle theme"` for accessibility

---

## 7. Acceptance Criteria

- [ ] Toggle button visible in Header on every page
- [ ] Clicking toggle switches between light and dark theme
- [ ] Smooth CSS transition (0.3s) when switching themes
- [ ] Theme preference saved in `localStorage`
- [ ] On app load, saved `localStorage` preference is applied
- [ ] If no saved preference, `prefers-color-scheme` is used as default
- [ ] All CSS colors use CSS custom properties (no hardcoded hex/rgb in theme-dependent styles)
- [ ] All components and pages look correct in both themes
- [ ] No console errors
