# 🤖 Feature Specification — Project Layout (Header & Footer)

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.

---

## 1. Feature Goal & Scope

### Goal
Create the global layout shell — `MainLayout`, `Header`, and `Footer` — that wraps every page in the application, ensuring consistent navigation, branding, and responsive behavior across all viewports.

### In Scope
- `MainLayout` wrapper component
- Sticky `Header` with nav links and AI-generated personal logo
- `Footer` with contact info and copyright
- Desktop horizontal navigation (> 768px)
- Mobile bottom icon navigation (≤ 768px)

### Out of Scope
- Page content (handled in Features 3–8)
- Theme toggle rendering (Extra Mile — light-dark-mode feature)
- Language switcher rendering (Extra Mile — languages feature)

---

## 2. Requirements Breakdown & User Flow

### Layout Hierarchy
```
<BrowserRouter>
  <MainLayout>
    <Header />        ← sticky top
    <main>
      <Outlet />      ← page content renders here
    </main>
    <Footer />        ← bottom of content
  </MainLayout>
</BrowserRouter>
```

### Navigation Links (Header — Desktop)
| Label | Route |
|-------|-------|
| Home | `/` |
| Portfolio | `/portfolio` |
| Links | `/links` |
| Contact | `/contact` |

> `/login` and `/backoffice` are **NOT** in the navigation.

### Navigation Links (Footer — Mobile Bottom Nav)
Same 4 routes, displayed as icons only.

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/MainLayout.jsx` | Create | Wraps all pages with Header + Footer |
| `src/components/layout/Header.jsx` | Create | Sticky top nav with logo + links |
| `src/components/layout/Footer.jsx` | Create | Bottom section with contact + copyright |
| `src/components/layout/MainLayout.module.css` | Create | Layout styles |
| `src/components/layout/Header.module.css` | Create | Header + nav styles (desktop + mobile) |
| `src/components/layout/Footer.module.css` | Create | Footer styles |
| `src/assets/logo.png` | Add | AI-generated personal logo |
| `src/App.jsx` | Edit | Integrate `MainLayout` with router |

---

## 4. Data & Behavior

### Header Behavior
- Fixed/sticky to top of viewport at all scroll positions
- Logo image in header → clicking it navigates to `/`
- Active nav link is visually highlighted (different color or underline)
- Consistent background color and styling on all pages

### Footer Behavior
- Appears at the bottom of every page content (not fixed to viewport)
- Contains:
  - Email address (Jenny's professional email)
  - Social links: LinkedIn, GitHub (with icons)
  - Copyright notice: `© 2026 Jenny. All rights reserved.`

### Responsive Behavior
| Screen | Header | Footer / Bottom Nav |
|--------|--------|---------------------|
| > 768px | Logo + horizontal text nav links | Standard footer |
| ≤ 768px | Logo only (scaled down) | Nav moves to bottom of screen as icon strip |

- On mobile, the bottom icon nav floats fixed at the bottom of the viewport
- Icons sourced from Lucide React (e.g., `<Home />`, `<Briefcase />`, `<Link />`, `<Mail />`)
- Active icon is highlighted

### Logo Requirements
- Generated with an AI tool (document tool name in a comment)
- Appropriate `alt` text: e.g., `alt="Jenny's personal logo"`
- Scales without overflow at all breakpoints

---

## 5. Validations & Expected Behavior

- Navigation links do NOT cause full page reloads (React Router `<Link>`)
- Logo click always navigates to `/` home page
- No horizontal overflow on any screen size
- Sticky header does not obscure page content (use top padding on `<main>`)

---

## 6. Acceptance Criteria

- [ ] `MainLayout` wraps all pages — Header and Footer always visible
- [ ] Header is sticky/fixed — stays visible while scrolling
- [ ] Header contains nav links to Home, Portfolio, Links, Contact
- [ ] Active route is visually highlighted in the nav
- [ ] Logo is AI-generated, visible in header, and navigates to `/` on click
- [ ] Logo has descriptive `alt` text
- [ ] Footer is visible on every page with email, social links, and copyright
- [ ] Desktop (> 768px): nav links displayed horizontally in the header
- [ ] Mobile (≤ 768px): nav becomes icon-only, moves to bottom of screen
- [ ] No content overflows the viewport on mobile
- [ ] Text is readable without horizontal scrolling on mobile
- [ ] No console errors
