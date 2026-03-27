# 🤖 Feature Specification — Back Office

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.

---

## 1. Feature Goal & Scope

### Goal
Build a protected admin back office at `/backoffice` where the authenticated admin (Jenny) can view all contact form messages, read each message in a modal, delete messages, and log out — all secured behind Supabase authentication.

### In Scope
- Protected route (redirects to `/login` if not authenticated)
- Messages table display (Name, Email, Date, Actions columns)
- View message modal (full message content)
- Delete message (instant removal from UI)
- Logout button
- Messages ordered by `created_at` descending

### Out of Scope
- Editing messages
- Replying to messages (no email integration)
- Public navigation (route is not in header/footer/mobile nav)

---

## 2. Requirements Breakdown & User Flow

### Access Control Flow
```
User navigates to /backoffice
  ↓
Check authentication status
  ↓
Not authenticated → redirect to /login
Authenticated → render Back Office
```

### Back Office Flow
```
Admin lands on /backoffice
  ↓
Messages fetched from Supabase (ordered newest first)
  ↓
Table rendered with Name | Email | Date | Actions columns
  ↓
Admin clicks "View" → modal opens with full message
Admin clicks "Delete" → message deleted from DB + removed from table instantly
Admin clicks "Logout" → session cleared → redirect to Home or Login
```

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/pages/BackOfficePage.jsx` | Create | Main Back Office page |
| `src/pages/BackOfficePage.module.css` | Create | Back Office styles |
| `src/components/ui/MessageModal.jsx` | Create | Modal for viewing full message |
| `src/components/ui/MessageModal.module.css` | Create | Modal styles |
| `src/components/ui/ProtectedRoute.jsx` | Create | Auth guard wrapper component |
| `src/lib/supabaseClient.js` | Use (existing) | Supabase queries |
| `src/App.jsx` | Edit | Wrap `/backoffice` with `ProtectedRoute` |

---

## 4. Data & Queries

### Fetch Messages
```js
const { data, error } = await supabase
  .from('messages')
  .select('*')
  .order('created_at', { ascending: false })
```

### Delete Message
```js
const { error } = await supabase
  .from('messages')
  .delete()
  .eq('id', messageId)
```

### Logout
```js
await supabase.auth.signOut()
```

---

## 5. Messages Table UI

### Columns
| Column | Data Source | Notes |
|--------|-------------|-------|
| Name | `message.name` | |
| Email | `message.email` | |
| Date | `message.created_at` | Format: `MM/DD/YYYY HH:MM` |
| Actions | — | "View" button + "Delete" button (or trash icon) |

### Table States
| State | UI Behavior |
|-------|-------------|
| Loading | Show spinner or `"Loading messages..."` |
| Empty | Show `"No messages yet."` |
| Error (fetch) | Show red error message: `"Failed to load messages."` |
| Data | Render table rows, newest first |

---

## 6. Message Modal

### Trigger
- Clicking a table row OR clicking a "View" button in the Actions column

### Modal Content
- Sender Name
- Sender Email
- Date and Time (formatted)
- Full message text

### Dismiss Methods
- Clicking the X / "Close" button
- Clicking outside the modal overlay
- Pressing `Escape` key

---

## 7. Delete Behavior

- Clicking "Delete" calls Supabase DELETE for that message's `id`
- On success: remove the row from local state instantly (optimistic update)
- On failure: show an error toast or inline message
- No confirmation dialog required (but can be added as an enhancement)

---

## 8. Protected Route Component

```jsx
// src/components/ui/ProtectedRoute.jsx
function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!session) return <Navigate to="/login" replace />
  return children
}
```

---

## 9. Acceptance Criteria

- [ ] `/backoffice` redirects to `/login` when not authenticated
- [ ] `/backoffice` renders the Back Office when authenticated
- [ ] Route is NOT in public navigation (header, footer, mobile nav)
- [ ] Messages fetched from Supabase `messages` table
- [ ] Table displays Name, Email, Date, and Actions columns
- [ ] Messages ordered by `created_at` descending (newest first)
- [ ] Loading state shown while fetching
- [ ] Empty state message shown when no messages exist
- [ ] Error state shown if fetch fails
- [ ] "View" button/row click opens modal with sender name, email, date, full message
- [ ] Modal closes on X button click
- [ ] Modal closes on outside click
- [ ] Modal closes on `Escape` key press
- [ ] "Delete" button removes message from Supabase and from the table instantly
- [ ] Logout button calls `supabase.auth.signOut()`
- [ ] After logout, user is redirected to Home or Login page
- [ ] No console errors
