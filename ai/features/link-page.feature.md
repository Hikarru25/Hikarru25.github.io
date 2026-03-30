# 🤖 Feature Specification — Links Page

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.

---

## 1. Feature Goal & Scope

### Goal
Build a curated links page that presents a collection of Jenny's important external resources — projects, social profiles, tools, or references — as visually rich cards that open in a new tab.

### In Scope
- Grid/list of link cards (≥ 3 links)
- Each card: image, title, description, clickable URL (new tab)
- At least 2 AI-generated images
- Responsive layout

### Out of Scope
- Dynamic link management / CRUD (links are hardcoded in the component)
- Authentication (page is public)
- Navigation (Feature 2)

---

## 2. Requirements Breakdown & User Flow

### User Flow
- User clicks "Links" in the nav
- Sees a grid of curated link cards
- Each card has a preview image, title, and short description
- Clicking a card (or a button) opens the URL in a new tab

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/pages/LinksPage.jsx` | Create | Main Links page component |
| `src/pages/LinksPage.module.css` | Create | Links page styles |
| `src/assets/link-image-1.png` | Add | AI-generated thumbnail/image |
| `src/assets/link-image-2.png` | Add | AI-generated thumbnail/image |

---

## 4. Content & Data

### Link Card Structure
```js
{
  id: 1,
  image: '/src/assets/link-image-1.png',  // or AI-generated
  title: 'GitHub Profile',
  description: 'Browse my public repositories, contributions, and open source work.',
  url: 'https://github.com/Hikarru25'
}
```

### Minimum 3 Links (examples — Jenny to customize)
| # | Title | Description | URL |
|---|-------|-------------|-----|
| 1 | GitHub Profile | Browse my public repositories and open source contributions. | `https://github.com/Hikarru25` |
| 2 | LinkedIn | My professional profile and work history in health technology and software development. | `https://linkedin.com/in/[jenny]` |
| 3 | CodeBoxx Academy | The coding bootcamp where I transitioned from business strategy to full-stack development. | `https://codeboxx.biz` |

> Jenny to add/replace with her actual curated links.

---

## 5. Card Component Structure

Each card displays:
- **Image** — thumbnail, logo, or AI-generated visual (with `alt` text)
- **Title** — name of the link destination
- **Description** — 1–3 sentences explaining the link
- **CTA Button or clickable card** — opens URL in `target="_blank"` with `rel="noopener noreferrer"`

---

## 6. AI-Generated Images

| Image | AI Tool | Alt Text | Location |
|-------|---------|----------|----------|
| Link card thumbnail 1 | Document tool | `"[Link title] thumbnail"` | Card image |
| Link card thumbnail 2 | Document tool | `"[Link title] thumbnail"` | Card image |

> Add a comment near each `<img>` tag: `{/* AI-generated using [Tool Name] */}`

---

## 7. Validations & Expected Behavior

- All URLs open in a new tab (`target="_blank"`)
- All external links include `rel="noopener noreferrer"` for security
- No broken images
- All images have descriptive `alt` text
- At least 3 cards are displayed

---

## 8. Acceptance Criteria

- [ ] Links page accessible at `/links`
- [ ] At least 3 link cards displayed
- [ ] Each card has an image, title, description, and clickable URL
- [ ] All links open in a new tab with `rel="noopener noreferrer"`
- [ ] At least 2 AI-generated images with `alt` text
- [ ] AI tool documented in a comment near each AI-generated image
- [ ] Cards are visually organized (grid or structured list)
- [ ] Fully responsive — cards stack properly on mobile
- [ ] No console errors
