# 🤖 Feature Specification — Contact Page

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.

---

## 1. Feature Goal & Scope

### Goal
Build a contact form page that allows visitors to send Jenny a message. The form validates input on the client side and submits the data to the Supabase `messages` table, providing clear success or failure feedback.

### In Scope
- Contact form with name, email, and message fields
- Client-side validation (required fields + email format)
- Supabase INSERT to `messages` table on valid submission
- Success feedback (green) and failure feedback (red)
- Form reset after successful submission

### Out of Scope
- Email notifications (not required — Supabase stores the message)
- Admin message reading (Feature 8 — Back Office)
- Authentication (this page is public/anonymous)

---

## 2. Requirements Breakdown & User Flow

### User Flow
1. User navigates to `/contact`
2. User fills in name, email, and message fields
3. User clicks "Send Message"
4. **If validation fails:** error messages shown inline, submission blocked
5. **If validation passes:** loading state shown on button
6. **If Supabase INSERT succeeds:** 
   - Green success message displayed
   - Form fields cleared
   - Success message auto-hides after ~4 seconds
7. **If Supabase INSERT fails:**
   - Red error message displayed
   - Form fields NOT cleared (user can retry)

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/pages/ContactPage.jsx` | Create | Main Contact page component |
| `src/pages/ContactPage.module.css` | Create | Contact page styles |
| `src/lib/supabaseClient.js` | Use (existing) | Import `supabase` for INSERT |

---

## 4. Form Fields & Validation

### Fields
| Field | Type | Validation |
|-------|------|-----------|
| Name | `text` input | Required, non-empty after trim |
| Email | `email` input | Required, valid email format (regex or HTML5 `type="email"`) |
| Message | `textarea` | Required, non-empty after trim |

### Validation Rules
- All three fields must be non-empty (trim before checking)
- Email must match a valid format
- Validation runs on form submit (not on every keystroke)
- Error messages displayed beneath each invalid field
- Submit button disabled or form rejects submission when validation fails

### Error Messages
- Name empty: `"Name is required"`
- Email empty: `"Email is required"`
- Email invalid: `"Please enter a valid email address"`
- Message empty: `"Message is required"`

---

## 5. Supabase Integration

### INSERT Payload
```js
const { error } = await supabase
  .from('messages')
  .insert([{ name, email, message }])
```

### Supabase Null Check
```js
if (!supabase) {
  setError('Contact form is currently unavailable. Please try again later.')
  return
}
```

### State Management
```js
const [loading, setLoading] = useState(false)
const [success, setSuccess] = useState(false)
const [error, setError] = useState(null)
```

---

## 6. Feedback UI

### Success State
- Green background or green-bordered box
- Checkmark icon (`<CheckCircle />` from Lucide)
- Text: `"Message sent! I'll get back to you soon."`
- Auto-hides after 4 seconds (`setTimeout`)
- Form fields cleared after display

### Failure State
- Red background or red-bordered box
- X icon (`<XCircle />` from Lucide)
- Text: `"Something went wrong. Please try again."`
- Form fields NOT cleared

### Loading State
- Submit button shows spinner or `"Sending..."` text
- Submit button disabled during loading

---

## 7. Acceptance Criteria

- [ ] Contact page accessible at `/contact`
- [ ] Form contains name (text), email (email), and message (textarea) fields
- [ ] All fields have visible labels or placeholders
- [ ] Submitting with empty fields shows validation errors, does not submit
- [ ] Submitting with invalid email format shows an error
- [ ] On valid submission, Supabase `messages` table receives the INSERT
- [ ] Loading state shown on button during submission
- [ ] Success message is green, visually distinct, and auto-hides after ~4 seconds
- [ ] Form fields are cleared after successful submission
- [ ] Failure message is red and visually distinct
- [ ] If Supabase is unavailable, a graceful fallback message is shown
- [ ] No console errors
- [ ] Fully responsive
