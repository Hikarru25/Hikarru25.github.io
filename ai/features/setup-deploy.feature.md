# 🤖 Feature Specification — Setup & Deploy

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.

---

## 1. Feature Goal & Scope

### Goal
Scaffold the React + Vite application and automate deployment to GitHub Pages via GitHub Actions. Establish the foundation every other feature builds on.

### In Scope
- Vite + React project scaffold (JavaScript)
- `vite.config.js` with correct `base` path
- GitHub Actions deploy workflow (`.github/workflows/deploy.yml`)
- Supabase client configuration
- `messages` table creation + RLS policies
- Supabase Auth setup with admin user
- `.env` / `.env.example` / `.gitignore` configuration
- GitHub Secrets configuration for CI

### Out of Scope
- Any UI pages or components (handled in later features)
- Supabase user-facing features (contact form, login — handled in Features 6 & 7)

---

## 2. Requirements Breakdown & User Flow

### Setup Flow
1. Run `npm create vite@latest .` in repo root → select React → JavaScript
2. Install dependencies: `npm install`
3. Install React Router: `npm install react-router-dom`
4. Install Supabase client: `npm install @supabase/supabase-js`
5. Install Lucide React icons: `npm install lucide-react`
6. Configure `vite.config.js`
7. Create `.env` + `.env.example` + update `.gitignore`
8. Create `src/lib/supabaseClient.js`
9. Create `.github/workflows/deploy.yml`
10. Set up Supabase project (table + RLS + auth)
11. Add secrets to GitHub repo settings
12. Push to `main` → verify GitHub Pages deploys

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `vite.config.js` | Create/Edit | Set `base: '/'` |
| `.env` | Create | Local env vars (gitignored) |
| `.env.example` | Create | Template with placeholder values |
| `.gitignore` | Edit | Ensure `.env` is listed |
| `src/lib/supabaseClient.js` | Create | Supabase client singleton |
| `.github/workflows/deploy.yml` | Create | CI/CD pipeline |
| `src/App.jsx` | Edit | Minimal placeholder (router setup) |
| `src/main.jsx` | Verify | Standard Vite entry point |

---

## 4. Configuration Details

### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

### .env.example
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### src/lib/supabaseClient.js
```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
```
> Fallback `null` when env vars are missing — all consumers must handle `supabase === null`.

### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      - uses: actions/deploy-pages@v4
        # (or peaceiris/actions-gh-pages — confirm with latest GitHub Pages Actions docs)
```

---

## 5. Supabase Setup

### messages Table SQL
```sql
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
```

### RLS Policies
```sql
-- Enable RLS
alter table messages enable row level security;

-- Public can insert (contact form)
create policy "Allow public insert"
  on messages for insert
  to anon
  with check (true);

-- Only authenticated users can read/delete (back office)
create policy "Allow authenticated read"
  on messages for select
  to authenticated
  using (true);

create policy "Allow authenticated delete"
  on messages for delete
  to authenticated
  using (true);
```

### Admin User
- Go to Supabase Dashboard → Authentication → Users → Add user
- Email: `admin@codeboxx.com`
- Password: `C0deB0xx4dm!n`

---

## 6. Acceptance Criteria

- [ ] `npm run dev` starts the app locally without errors
- [ ] `npm run build` completes without errors
- [ ] `vite.config.js` has `base: '/'`
- [ ] `.env` is listed in `.gitignore` and never committed
- [ ] `.env.example` is committed with placeholder values
- [ ] `src/lib/supabaseClient.js` exports the Supabase client (with null fallback)
- [ ] `.github/workflows/deploy.yml` exists and triggers on push to `main`
- [ ] Workflow runs `npm ci`, `npm run build`, and deploys `dist/`
- [ ] `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are added to GitHub Secrets
- [ ] Navigating to `https://Hikarru25.github.io` loads the React app
- [ ] `messages` table exists in Supabase with correct schema
- [ ] RLS policies are active (anon can insert, authenticated can select/delete)
- [ ] Admin user `admin@codeboxx.com` exists in Supabase Auth
