# CONCEPTS.md — Three Challenging Concepts

**Author:** Jenny (Jihane Sakhi)
**Project:** Hikarru25.github.io — Personal Portfolio

---

## Concept 1 — Authentication with React Context (AuthContext)

### What is it?
AuthContext is a React context that tracks whether the user is logged in or not, and shares that information with the entire app.

Think of it like a security badge reader at the entrance of a building. Every time you enter, it checks your badge. If you have one, you get in. If not, you're turned away. In this project, that "badge check" happens through Supabase — when the user logs in, Supabase gives them a session token, and AuthContext holds onto it so any part of the app can know if the user is authenticated.

In this project:
- **AuthContext** — stores the current session and a `loading` state while Supabase checks if a session exists
- Any component that needs to know "is someone logged in?" just reads from this context

### Why was it challenging?
The tricky part was the **timing**. Checking the session isn't instant — Supabase has to read from localStorage and verify the token. While that's happening, the context doesn't know yet if you're logged in or not.

Without handling that wait, the app would see `null` (no session) and assume nobody is logged in — even if they are. I had to add a `loading` state so the app waits for the answer before making any decisions.

I also had to use `onAuthStateChange` — a Supabase listener that updates the session automatically whenever the user logs in or out, without needing to refresh the page.

### Where to find it in the code

| What | File | Line |
|------|------|------|
| AuthContext — session and loading state | `src/context/AuthContext.jsx` | 29, 36 |
| Checks session on page load | `src/context/AuthContext.jsx` | 34–37 |
| Listens for login/logout events | `src/context/AuthContext.jsx` | 41–45 |
| AuthProvider wrapping the app | `src/main.jsx` | 10–18 |

---

## Concept 2 — Supabase Row Level Security (RLS)

### What is it?
RLS is a set of rules that live **inside the database** and control who is allowed to do what with the data.

Think of it like a bouncer at a club. No matter what the app code says, the database itself checks your ID before letting you in. Even if there was a bug in the frontend, the database would still block unauthorized access.

In this project:
- **Anyone** (even without an account) can **add** a row to the messages table → so the contact form works for visitors
- **Only the logged-in admin** can **read** or **delete** rows → so the back office is protected at the database level, not just the UI level

### Why was it challenging?
RLS runs on the Supabase/PostgreSQL side — you can't see it in the JavaScript code at all. The tricky parts were:

1. **You have to enable RLS first**, then add policies. A table with RLS enabled but no policies blocks *everything* — I had to understand that order matters.
2. **The roles are automatic.** Supabase figures out if you're "anonymous" or "authenticated" based on the login token attached to each request. I didn't have to do anything manually — the client just sends it.
3. **Debugging is harder** — when RLS blocks a request, the error message is vague. I had to test policies directly in the Supabase dashboard to figure out what was wrong.

### Where to find it in the code

| What | File | Line |
|------|------|------|
| Supabase client (sends login token automatically) | `src/lib/supabaseClient.js` | entire file |
| Contact form INSERT (public/anon policy) | `src/pages/ContactPage.jsx` | 100–103 |
| Back office SELECT (authenticated only) | `src/pages/BackOfficePage.jsx` | 44–47 |
| Back office DELETE (authenticated only) | `src/pages/BackOfficePage.jsx` | 70–73 |

> Also open the Supabase dashboard → Table Editor → `messages` → RLS Policies to show the actual rules during the video.

---

## Concept 3 — Protected Routes

### What is it?
A protected route is a page that checks "are you logged in?" before it lets you in. If you're not, it sends you to the login page instead.

In this project, `/backoffice` is the protected route. `ProtectedRoute` is just a wrapper component that does the check — it either shows the page or redirects, depending on the session.

### Why was it challenging?
The problem is that checking the session isn't instant — it's async. Supabase has to read from localStorage and verify the token. While that's happening, the component doesn't know yet if you're logged in or not.

Without handling that wait time, the page would briefly redirect to `/login` even for a valid session — because it looked at the session before it was ready and saw `null`.

The fix was adding a `loading` state. While loading is `true`, the component renders nothing. Once the check is done, it either shows the page or redirects. That loading gap is tiny — less than a second — but it prevents the flash.

### Where to find it in the code

| What | File | Line |
|------|------|------|
| Full ProtectedRoute component | `src/components/ui/ProtectedRoute.jsx` | 1–41 |
| Loading guard — renders nothing while session loads | `src/components/ui/ProtectedRoute.jsx` | 29–31 |
| No session → redirect to /login | `src/components/ui/ProtectedRoute.jsx` | 35–37 |
| Session exists → show the page | `src/components/ui/ProtectedRoute.jsx` | 40 |
| ProtectedRoute wrapping /backoffice | `src/App.jsx` | 37–41 |
| loading state defined in AuthContext | `src/context/AuthContext.jsx` | 29, 36 |
| onAuthStateChange — keeps session live across refreshes | `src/context/AuthContext.jsx` | 41–45 |
