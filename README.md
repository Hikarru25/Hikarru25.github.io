# Jenny's Portfolio — Hikarru25.github.io

A personal portfolio website built with React and Vite, deployed to GitHub Pages. Features a public-facing site (Home, Portfolio, Links, Contact) and a private admin back office for managing contact messages, backed by Supabase.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 (functional components + hooks) |
| Build Tool | Vite |
| Language | JavaScript (ES2022+) |
| Styling | CSS Modules |
| Routing | React Router v6 |
| Backend / Database | Supabase (PostgreSQL + Auth) |
| Deployment | GitHub Pages via GitHub Actions |
| Icons | Lucide React |
| i18n | Custom JSON-based translation system (EN / FR) |

---

## Project Structure

```
Hikarru25.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD — builds and deploys to GitHub Pages
├── ai/
│   ├── ai-spec.md              # Global AI specification (read first)
│   └── features/               # Per-feature AI specs
├── docs/
│   ├── script-1.md             # Elevator pitch script #1
│   ├── script-2.md             # Elevator pitch script #2
│   └── pitch-feedback.md       # Feedback on pitch #1
├── LeetCode-Challenges/        # LeetCode solution screenshots (.png)
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── assets/
│       └── jenny-cv.pdf        # Downloadable resume
├── src/
│   ├── assets/                 # Images (AI-generated and other)
│   ├── components/
│   │   ├── layout/             # MainLayout, Header, Footer
│   │   └── ui/                 # MessageModal, ProtectedRoute
│   ├── context/                # AuthContext, ThemeContext, LanguageContext
│   ├── hooks/                  # useAuth, useTheme, useLanguage
│   ├── i18n/                   # en.json, fr.json
│   ├── lib/
│   │   └── supabaseClient.js   # Supabase singleton
│   ├── pages/                  # HomePage, PortfolioPage, LinksPage,
│   │                           # ContactPage, LoginPage, BackOfficePage
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example                # Environment variable template
├── vite.config.js
├── package.json
├── CONCEPTS.md
└── README.md
```

---

## Installation / Setup Instructions

**Prerequisites:** Node.js 18+ and npm

```bash
# 1. Clone the repository
git clone https://github.com/Hikarru25/Hikarru25.github.io.git
cd Hikarru25.github.io

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Then fill in your Supabase values in .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- **Never commit `.env`** — it is listed in `.gitignore`
- For production, add these as secrets in GitHub → Settings → Secrets and variables → Actions
- The deploy workflow reads them via the `env:` block in `.github/workflows/deploy.yml`

> If environment variables are not set, the app falls back gracefully — the contact form will display an error on submission rather than crashing.

---

## API Documentation

This project does not expose a custom REST API. All backend operations go through the **Supabase client** (`src/lib/supabaseClient.js`).

### Supabase `messages` Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `uuid` | Primary key, `gen_random_uuid()` |
| `name` | `text` | Not null |
| `email` | `text` | Not null |
| `message` | `text` | Not null |
| `created_at` | `timestamptz` | Default `now()` |

### Row Level Security (RLS) Policies

| Operation | Who |
|-----------|-----|
| `INSERT` | Public (anonymous) — anyone can submit the contact form |
| `SELECT` | Authenticated users only (admin back office) |
| `DELETE` | Authenticated users only (admin back office) |

### Authentication

- Provider: Supabase Email/Password Auth
- The admin account is pre-created in the Supabase dashboard (not via the app)
- Login route: `/login` (not in public navigation — type URL directly)
- After login, the session is persisted automatically by the Supabase client

---

## Author

**Jenny (Jihane Sakhi)**
- GitHub: [github.com/Hikarru25](https://github.com/Hikarru25)
- LinkedIn: [ca.linkedin.com/in/jihanesakhi](https://ca.linkedin.com/in/jihanesakhi)
- Live site: [hikarru25.github.io](https://hikarru25.github.io)
