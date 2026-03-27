# 🤖 Feature Specification — Login Page

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.

---

## 1. Feature Goal & Scope

### Goal
Build a secret, unlisted login page that allows the admin (Jenny) to authenticate via Supabase Auth. Upon successful login, the user is redirected to the Back Office. The route is not exposed in any public navigation.

### In Scope
- Login form (email + password)
- Supabase `signInWithPassword` authentication
- Redirect to `/backoffice` on success
- Redirect to `/backoffice` if already authenticated
- Error message on failed login
- Session persistence (page refresh does not log out)
- Secret access method (URL or keyboard shortcut)

### Out of Scope
- User registration / sign-up (admin pre-created in Supabase dashboard)
- Password reset flow
- Public navigation link (route is secret)

---

## 2. Requirements Breakdown & User Flow

### Access Methods
1. **Direct URL:** Navigate to `/login` manually in the browser address bar
2. **Secret Keyboard Shortcut (optional enhancement):** e.g., pressing `Ctrl+Shift+L` or a specific key sequence triggers a redirect to `/login`

### User Flow
```
User navigates to /login
  ↓
If already authenticated → redirect to /backoffice immediately
  ↓
User sees login form (email + password + submit button)
  ↓
User fills in credentials and submits
  ↓
[Loading state shown]
  ↓
If success → redirect to /backoffice
If failure → red error message shown, form not cleared
```

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/pages/LoginPage.jsx` | Create | Login page with form |
| `src/pages/LoginPage.module.css` | Create | Login page styles |
| `src/context/AuthContext.jsx` | Create | Auth state provider (session management) |
| `src/hooks/useAuth.js` | Create | Hook to access auth context |
| `src/lib/supabaseClient.js` | Use (existing) | `supabase.auth.signInWithPassword()` |
| `src/App.jsx` | Edit | Add `/login` route |

---

## 4. Form Fields

| Field | Type | Placeholder |
|-------|------|------------|
| Email | `type="email"` | `"admin@codeboxx.com"` |
| Password | `type="password"` | `"Password"` |
| Submit | `type="submit"` | `"Login"` |

---

## 5. Authentication Logic

### Sign In
```js
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
```

### Session Persistence
```js
// In AuthContext or App.jsx — check session on mount
const { data: { session } } = await supabase.auth.getSession()
```

### Auth State Listener
```js
supabase.auth.onAuthStateChange((event, session) => {
  setSession(session)
})
```

---

## 6. States & Feedback

| State | UI Behavior |
|-------|-------------|
| Loading | Submit button disabled, shows `"Logging in..."` or spinner |
| Success | Redirect to `/backoffice` |
| Error | Red error message below the form: `"Invalid login credentials"` |
| Already authenticated | Auto-redirect to `/backoffice` (no form shown) |

---

## 7. Validations & Expected Behavior

- Email and password fields are required
- Form cannot be submitted with empty fields
- If credentials are wrong, Supabase returns an error → display it in red
- Session persists across page refreshes (Supabase handles this via localStorage)
- Route `/login` does **not** appear in Header nav, Footer, or mobile bottom nav

---

## 8. Acceptance Criteria

- [ ] Login page accessible at `/login`
- [ ] `/login` is NOT in the header nav, footer, or mobile bottom nav
- [ ] Email input (`type="email"`) is present
- [ ] Password input (`type="password"`) is present
- [ ] Submit button is present
- [ ] `supabase.auth.signInWithPassword()` is called on submission
- [ ] Supabase client imported from `src/lib/supabaseClient.js`
- [ ] Loading state shown during authentication
- [ ] Successful login redirects to `/backoffice`
- [ ] Session persists — refreshing the page does not log out
- [ ] If already authenticated, user is redirected to `/backoffice` without seeing the form
- [ ] Failed login shows a red error message
- [ ] No console errors
