# CODEBASE.md — Jenny's Portfolio: A Junior Developer's Guide

> Written for junior developers who want to understand how this project is built, why each decision was made, and what concepts to learn from it.

---

## What Is This Project?

This is a **personal portfolio website** built and deployed by Jenny. It has two sides:

- **Public side** — A portfolio visitors can browse: home, projects, links, and a contact form
- **Admin side** — A protected back office where Jenny can read and delete messages sent through the contact form

The site is built with **React**, backed by **Supabase** (a cloud database and auth service), and deployed automatically to **GitHub Pages** every time code is pushed to the `main` branch.

---

## Project Structure

```
Module-16/
├── .github/workflows/       → CI/CD: automatically deploys to GitHub Pages on push to main
├── ai/                      → AI specs and feature documentation written before coding
├── docs/                    → Elevator pitch scripts and presentation notes
├── public/                  → Static files (favicon, icons, CV PDF) — copied as-is to build
├── src/                     → All application source code lives here
│   ├── assets/              → Images (profile photo, logo, CodeBoxx logo)
│   ├── components/
│   │   ├── layout/          → Header, Footer, MainLayout — the structural shell of every page
│   │   └── ui/              → Reusable components: ProtectedRoute, MessageModal
│   ├── context/             → Global state: Auth, Theme, Language (React Context API)
│   ├── hooks/               → Custom hooks that simplify context access
│   ├── i18n/                → Translation files (English and French JSON)
│   ├── lib/                 → Supabase client — one instance shared across the whole app
│   ├── pages/               → One component per route (6 pages total)
│   ├── App.jsx              → The routing hub — maps URLs to page components
│   ├── main.jsx             → Entry point — wraps the app in all context providers
│   └── index.css            → Global styles and CSS theme variables
├── .env                     → Your local environment variables (never committed to git)
├── .env.example             → Template showing which variables are needed
├── vite.config.js           → Build tool configuration
├── package.json             → Project dependencies and scripts
├── README.md                → Setup and deployment instructions
└── CONCEPTS.md              → Deep dives on 3 challenging concepts
```

---

## Technologies Used and Why

| Technology | What it does | Why it's used here |
|---|---|---|
| **React 19** | UI library for building component-based interfaces | The industry standard for SPAs — reusable components, fast rendering |
| **React Router v6** | Client-side navigation between pages | Gives real URLs (/portfolio, /contact) without full page reloads |
| **Supabase** | Cloud database (PostgreSQL) + authentication | Replaces a custom backend — handles DB, auth, and Row Level Security |
| **Vite** | Build tool and dev server | Fast development server with Hot Module Replacement, optimized builds |
| **CSS Modules** | Scoped CSS per component | Prevents class name collisions between components |
| **Lucide React** | Icon library | Clean, consistent SVG icons used across the UI |
| **GitHub Actions** | CI/CD pipeline | Auto-deploys to GitHub Pages on every push to main — no manual steps |

---

## The 6 Pages

| Route | Page | Who can see it |
|---|---|---|
| `/` | HomePage | Everyone |
| `/portfolio` | PortfolioPage | Everyone |
| `/links` | LinksPage | Everyone |
| `/contact` | ContactPage | Everyone |
| `/login` | LoginPage | Everyone (but not in nav) |
| `/backoffice` | BackOfficePage | Authenticated users only |

The `/login` and `/backoffice` routes are intentionally hidden from the navigation bar. They're "secret" admin routes.

---

## Key Technical Concepts

### 1. Component Architecture

React apps are built from **components** — reusable pieces of UI. This project organizes them in three tiers:

- **Layout components** (`Header`, `Footer`, `MainLayout`) — the structural shell that wraps every page. Instead of copy-pasting a header into every page, `MainLayout` does it once.
- **UI components** (`ProtectedRoute`, `MessageModal`) — reusable widgets that solve a specific problem.
- **Page components** (`HomePage`, `ContactPage`, etc.) — one component per route, each responsible for a full screen of content.

**Why this matters:** If you need to change the footer, you change one file. If you need a modal in multiple places, you build it once and reuse it.

---

### 2. Routing (React Router v6)

React Router lets your app respond to URL changes **without reloading the page**. The browser just updates the URL bar, React Router matches it to a component, and React re-renders.

In `App.jsx`, each `<Route>` maps a path to a component:

```jsx
<Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
```

All routes are wrapped in `MainLayout`, so every page automatically gets a header and footer.

**Key concept — SPA vs. traditional websites:**
Traditional websites request a new HTML file for each URL. In a Single Page Application (SPA), there's only one `index.html`. JavaScript handles all navigation internally. This is why GitHub Pages needs a `404.html` workaround — GitHub Pages tries to find a real file at `/login`, doesn't find one, and serves the 404 redirect which hands control back to React.

---

### 3. Global State with React Context

Some data needs to be available everywhere in the app — the current user session, the active theme, the selected language. Passing this as props through every component would be messy. **React Context** solves this.

This project has three context providers:

**AuthContext** — tracks whether a user is logged in
```
session = null → not logged in
session = { user: { email: '...' } } → logged in
loading = true → still checking (don't redirect yet)
```

**ThemeContext** — tracks light/dark mode
- On first load: checks localStorage, then OS preference
- Applies by setting `data-theme="dark"` on the `<html>` element
- CSS rules react to this attribute to swap all colors

**LanguageContext** — tracks EN/FR language
- Stores the active language in state
- Provides a `t('key')` translation function
- `t('nav.home')` walks the JSON: `{ nav: { home: "Home" } }` → `"Home"`

All three providers wrap the entire app in `main.jsx` so every component can access them.

---

### 4. Custom Hooks

Custom hooks are functions that start with `use` and let you reuse logic across components.

Instead of writing `useContext(AuthContext)` everywhere, you write:

```js
const { session, loading } = useAuth()
```

This is cleaner, easier to read, and means if you change how auth works, you only update one place.

The three custom hooks in this project (`useAuth`, `useTheme`, `useLanguage`) are thin wrappers around their respective contexts.

---

### 5. Authentication with Supabase

Authentication is the process of verifying who a user is. Here's the full login flow:

1. User submits email + password at `/login`
2. `supabase.auth.signInWithPassword()` is called
3. Supabase verifies credentials and returns a **session token** (JWT)
4. The token is stored in `localStorage` automatically by the Supabase client
5. `AuthContext` listens for this event via `onAuthStateChange()` and updates state
6. The app detects the session and navigates to `/backoffice`

On every page load, `AuthContext` calls `supabase.auth.getSession()` to restore any saved session from localStorage. This is why you stay logged in after refreshing the page.

---

### 6. Protected Routes

The back office should only be accessible to authenticated admins. `ProtectedRoute` is the component that enforces this.

It works like a bouncer:
1. Is it still loading (checking session)? → Let nobody in yet, render nothing
2. Is there no session? → Send to `/login`
3. Is there a session? → Let them through, render the page

The `loading` state is critical. Without it, every page load would briefly redirect to `/login` (because session starts as null before Supabase checks localStorage), causing a visible flash.

---

### 7. Supabase Database and Row Level Security

The `messages` table stores contact form submissions:

| Column | Type | Notes |
|---|---|---|
| id | uuid | Auto-generated primary key |
| name | text | Sender's name |
| email | text | Sender's email |
| message | text | Message body |
| created_at | timestamp | Auto-set to current time |

**Row Level Security (RLS)** is a Supabase feature that enforces access rules **at the database level**, not just in the frontend:

| Action | Who can do it | Why |
|---|---|---|
| INSERT | Anyone (anonymous) | Visitors need to submit the contact form |
| SELECT | Logged-in users only | Only the admin reads messages |
| DELETE | Logged-in users only | Only the admin deletes messages |

This means even if someone bypasses the React UI, they can't read or delete messages without a valid session. Security lives in the database, not just the code.

---

### 8. Internationalization (i18n)

The entire site is available in English and French. All visible text comes from JSON translation files:

```json
// en.json
{ "nav": { "home": "Home", "portfolio": "Portfolio" } }

// fr.json
{ "nav": { "home": "Accueil", "portfolio": "Portfolio" } }
```

The `t()` function takes a dot-notation key and returns the translation for the active language:
```js
t('nav.home') // → "Home" (EN) or "Accueil" (FR)
```

Language preference is saved to localStorage so it persists across page refreshes.

---

### 9. Theme System (CSS Variables)

The light/dark theme uses **CSS custom properties** (variables):

```css
:root[data-theme='dark'] {
  --bg: #0f0f0f;
  --text: #f5f5f5;
  --accent: #c084fc;
}

:root[data-theme='light'] {
  --bg: #ffffff;
  --text: #1a1a1a;
  --accent: #aa3bff;
}
```

Every color in every component references these variables (`background: var(--bg)`). When ThemeContext sets `data-theme` on the `<html>` element, all variables update instantly — and CSS transitions make it smooth.

---

### 10. CI/CD with GitHub Actions

The deployment pipeline is fully automated. When you push to `main`:

```
Push to main
  → GitHub Actions runs .github/workflows/deploy.yml
  → npm ci (install dependencies)
  → npm run build (Vite compiles to dist/)
  → Supabase secrets injected as environment variables
  → dist/ uploaded to GitHub Pages
  → Site live at hikarru25.github.io
```

The Supabase keys are stored as **GitHub Secrets** (not in the code), so they never appear in the repository but are available during the build.

---

## Data Flow Diagrams

### Contact Form Submission
```
User types message → Client validates (required + email regex)
  → supabase.from('messages').insert({ name, email, message })
  → RLS checks: anon role → INSERT allowed
  → Database stores message with auto-generated id + created_at
  → Success: green banner shown, form clears
  → Error: red error message shown
```

### Admin Viewing Messages
```
Visit /backoffice
  → ProtectedRoute checks session
  → No session: redirect to /login
  → Session valid: render BackOfficePage
  → supabase.from('messages').select()
  → RLS checks: authenticated role → SELECT allowed
  → Messages displayed in table
  → Click "View": modal opens with full message
  → Click "Delete": row removed from UI immediately (optimistic)
    → supabase.from('messages').delete().eq('id', id)
    → If fails: row is put back (rollback)
```

---

## Patterns Worth Learning From This Project

**1. Single Responsibility** — Each file does one thing. `supabaseClient.js` only creates the client. `useAuth.js` only exposes auth state. Keeps code readable and testable.

**2. Optimistic UI** — In `BackOfficePage`, deleting a message removes it from the UI *before* the database confirms. If it fails, the item is restored. This makes the app feel instant.

**3. Environment Variables** — Sensitive keys (Supabase URL, anon key) are never hardcoded. They live in `.env` locally and in GitHub Secrets in production. The `.env.example` documents what's needed without exposing real values.

**4. Accessibility basics** — The back office modal closes on Escape key, backdrop click, and the X button. `stopPropagation` prevents accidental closes when clicking inside the modal.

**5. Spec-first development** — The `ai/` folder contains specs written *before* the features were built. This forces you to think through requirements before touching code.

---

## Running the Project Locally

```bash
# 1. Clone the repo
git clone git@github.com:Hikarru25/Hikarru25.github.io.git
cd Hikarru25.github.io

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Supabase URL and anon key

# 4. Start the dev server
npm run dev
# → http://localhost:5173

# 5. Build for production (optional)
npm run build
```

---

*This document was written as a learning reference. If something is unclear, start with the concept it references — routing, context, auth — and come back to the code once you understand the idea.*
