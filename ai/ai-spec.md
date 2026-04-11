# 🤖 Global AI Specification — Hikarru25.github.io

> ⚠️ **Read this document FIRST before implementing any feature.**  
> Every AI-assisted implementation must follow the rules defined here.

---

## 1. Project Identity & Scope

### Identity
- **Project Name:** Jenny's Portfolio — Hikarru25.github.io
- **Owner:** Jenny
- **Type:** Personal portfolio website + admin back office
- **Live URL:** https://Hikarru25.github.io
- **Repository:** https://github.com/Hikarru25/Hikarru25.github.io

### In Scope
- Static personal portfolio site (Home, Portfolio, Links, Contact pages)
- Admin-only back office (view/delete contact messages)
- GitHub Actions CI/CD pipeline (build + deploy to GitHub Pages)
- Supabase integration (contact form → `messages` table + email/password auth)
- Fully responsive design (desktop ≥ 768px and mobile ≤ 768px)
- Light/Dark mode toggle *(Extra Mile)*
- Multi-language support EN/FR *(Extra Mile)*

### Out of Scope
- Custom backend server or REST API (Supabase handles all backend)
- User registration / public sign-up (admin account only, pre-created in Supabase dashboard)
- Payment processing
- Blog / CMS functionality
- Native mobile app

---

## 2. Architecture & Repository Structure

```
Hikarru25.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions CI/CD → GitHub Pages
├── ai/
│   ├── ai-spec.md                # THIS FILE — read first
│   └── features/                 # One spec per feature
│       ├── setup-deploy.feature.md
│       ├── header-footer.feature.md
│       ├── home-page.feature.md
│       ├── portfolio-page.feature.md
│       ├── link-page.feature.md
│       ├── contact-page.feature.md
│       ├── login-page.feature.md
│       ├── back-office.feature.md
│       ├── light-dark-mode.feature.md
│       └── languages.feature.md
├── docs/
│   ├── script-1.md
│   ├── script-2.md
│   └── pitch-feedback.md
├── LeetCode-Challenges/          # Screenshots only (.png)
├── public/
│   └── assets/
│       └── jenny-cv.pdf          # Downloadable resume
├── src/
│   ├── assets/                   # Images (AI-generated + others)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/                   # Reusable: Button, Card, Modal, etc.
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── PortfolioPage.jsx
│   │   ├── LinksPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── BackOfficePage.jsx
│   ├── lib/
│   │   └── supabaseClient.js     # Supabase singleton — always import from here
│   ├── hooks/                    # Custom React hooks (useAuth, useTheme, etc.)
│   ├── context/                  # React context providers
│   ├── i18n/                     # Translation JSON files (Extra Mile)
│   ├── App.jsx
│   └── main.jsx
├── .env                          # Local secrets — NEVER commit
├── .env.example                  # Template — committed to repo
├── .gitignore
├── vite.config.js
├── index.html
├── package.json
├── README.md
└── CONCEPTS.md
```

---

## 3. Tech Stack & Constraints

| Layer | Technology | Version / Notes |
|-------|-----------|-----------------|
| Frontend Framework | React | 18+ — functional components + hooks only |
| Build Tool | Vite | `base: '/'` configured for root GitHub Pages repo |
| Language | JavaScript | ES2022+ — no TypeScript |
| Styling | CSS Modules or plain CSS | No CSS-in-JS libraries |
| Routing | React Router | v6 — `BrowserRouter` |
| Backend / DB | Supabase | Auth + PostgreSQL |
| Deployment | GitHub Pages via Actions | `dist/` folder deployed |
| Icons | Lucide React | Consistent icon library across all features |
| AI Image Tool | Document in each feature spec | Alt text required on every image |

### Hard Constraints
- 🚫 No direct commits to `main`
- 🚫 No secrets in the repository — use `.env` locally, GitHub Secrets in CI
- 🚫 No class-based React components
- 🚫 No jQuery or direct DOM manipulation outside React
- 🚫 No `console.log` left in production builds
- ✅ All `VITE_*` env vars must be passed via `env:` in the deploy workflow

---

## 4. Coding Standards & Conventions

### File & Folder Naming
| Type | Convention | Example |
|------|-----------|---------|
| Components | `PascalCase.jsx` | `ContactForm.jsx` |
| Pages | `PascalCase.jsx` | `HomePage.jsx` |
| Hooks | `camelCase.js` prefixed `use` | `useAuth.js` |
| Utilities | `camelCase.js` | `formatDate.js` |
| CSS Modules | Same as component | `Header.module.css` |
| Context | `PascalCase.jsx` | `AuthContext.jsx` |

### Component Rules
- Functional components only (no class components)
- One component per file
- Props documented with a comment if non-obvious
- No inline styles — use CSS classes or CSS Modules

### Async & Error Handling
- All async operations wrapped in `try/catch`
- Loading state shown while async operations are pending
- Error state shown when operations fail
- Success feedback shown after successful operations

### Git Conventions
- **Branch naming:** `feature/<short-kebab-description>`
- **Commit messages:** imperative mood — `Add header component` / `Fix mobile nav layout`
- **Flow:** `feature/* → dev → main` (no direct commits to `main`)

---

## 5. Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous public key | Yes |

- Local: defined in `.env` (gitignored)
- CI/CD: defined in GitHub repo → Settings → Secrets and variables → Actions
- Template: `.env.example` with placeholder values (committed)

---

## 6. Supabase Schema

### `messages` Table
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `name` | `text` | Not null |
| `email` | `text` | Not null |
| `message` | `text` | Not null |
| `created_at` | `timestamptz` | Default `now()` |

### RLS Policies
- **INSERT:** Allow anonymous (public can submit contact form)
- **SELECT / DELETE:** Allow authenticated users only (admin back office)

### Auth
- Provider: Email/Password
- Admin user pre-created in Supabase dashboard
- Credentials: `admin@codeboxx.com` / `C0deB0xx4dm!n`

---

## 7. Routing Map

| Route | Page | Auth Required | In Nav |
|-------|------|---------------|--------|
| `/` | Home | No | Yes |
| `/portfolio` | Portfolio | No | Yes |
| `/links` | Links | No | Yes |
| `/contact` | Contact | No | Yes |
| `/login` | Login | No | **No** — secret route |
| `/backoffice` | Back Office | **Yes** | **No** — protected |

---

## 8. Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|---------|
| `> 768px` (desktop) | Horizontal nav in header |
| `≤ 768px` (mobile) | Nav becomes icons, displayed at bottom of screen |

---

## 9. Global Definition of Done

A feature is **Done** when ALL of the following are true:

- [ ] All acceptance criteria from the feature spec are met
- [ ] Responsive on desktop (> 768px) AND mobile (≤ 768px)
- [ ] No console errors in browser DevTools
- [ ] All images have descriptive `alt` text
- [ ] No hardcoded secrets or credentials in code
- [ ] Feature branch merged into `dev`
- [ ] Live deploy on GitHub Pages reflects the changes

### Cross-Feature Rules
- Every page must be wrapped in `MainLayout` (Header + Footer)
- Supabase client **always** imported from `src/lib/supabaseClient.js`
- `/login` and `/backoffice` routes must **not** appear in public navigation
- AI-generated images must be documented (tool name + purpose) in a comment near the `<img>` tag
- All forms must include loading state, success feedback, and error feedback
