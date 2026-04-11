# 🤖 Feature Specification — Portfolio Page

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.

---

## 1. Feature Goal & Scope

### Goal
Build the Portfolio / Resume page that showcases Jenny's education, work experience, and personal/professional projects — functioning as an interactive curriculum vitae with a downloadable PDF version.

### In Scope
- Education section (institution, degree, dates — reverse chronological)
- Work experience section (title, org, dates, description — reverse chronological)
- Projects / portfolio section (name, tech, description, image)
- Downloadable PDF resume button
- At least 2 AI-generated images
- Responsive layout

### Out of Scope
- Contact form (Feature 6)
- Skills sections (on Home page — Feature 3)
- Navigation (Feature 2)

---

## 2. Requirements Breakdown & User Flow

### Page Sections (top to bottom)
1. **Page Header** — Title and brief intro
2. **Education** — Reverse chronological list/cards
3. **Work Experience** — Reverse chronological list/cards
4. **Projects / Portfolio** — Card grid with image + details
5. **Download CV** — Button to download PDF resume

### User Flow
- User clicks "Portfolio" in the nav
- Sees Jenny's full background: education → work → projects
- Can download the PDF resume
- Can click project cards for more info (or link to project)

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/pages/PortfolioPage.jsx` | Create | Main Portfolio page component |
| `src/pages/PortfolioPage.module.css` | Create | Portfolio page styles |
| `public/assets/jenny-cv.pdf` | Add | Downloadable PDF resume |
| `src/assets/portfolio-image-1.png` | Add | AI-generated image (e.g., section header) |
| `src/assets/portfolio-image-2.png` | Add | AI-generated image (e.g., avatar or decoration) |

---

## 4. Content & Data

### Education (reverse chronological)
```
CodeBoxx Academy — Full Stack Web Development
2025 – 2026

[Previous Institution] — [Degree / Program]
[Start Year] – [End Year]
```

### Work Experience (reverse chronological)
```
[Most Recent Role] — [Organization]
[Start Date] – [End Date or Present]
Responsibilities: [description of responsibilities and achievements]

[Previous Role] — [Organization]
[Start Date] – [End Date]
Responsibilities: [description]
```
> Jenny to provide her actual work history.

### Projects / Portfolio
Each project card includes:
- **Project Name**
- **Tech Stack** (tags: e.g., React, Node.js, Supabase)
- **Description** — what it is and its purpose
- **Image** (screenshot, mockup, or AI-generated visual)

Minimum 1 project. Example placeholder:
```
Project: This Portfolio Website
Tech: React, Vite, Supabase, GitHub Actions
Description: A personal portfolio and admin back office built from scratch.
  Demonstrates full-stack skills including CI/CD deployment,
  Supabase authentication, and responsive design.
Image: AI-generated project visual
```

---

## 5. AI-Generated Images

| Image | AI Tool | Alt Text | Location |
|-------|---------|----------|----------|
| Portfolio section header | Document tool | `"Portfolio page header illustration"` | Page header or section |
| Project card image (if no screenshot) | Document tool | `"[Project name] project preview"` | Project card |

> Add a comment near each `<img>` tag: `{/* AI-generated using [Tool Name] */}`

---

## 6. PDF Resume

- PDF file stored at `public/assets/jenny-cv.pdf`
- Download triggered via `<a href="/assets/jenny-cv.pdf" download>Download CV</a>`
- Button is clearly visible (e.g., sticky top or bottom of page)
- File must be an actual PDF (not a placeholder)

---

## 7. Validations & Expected Behavior

- Education entries in reverse chronological order (most recent first)
- Work entries in reverse chronological order (most recent first)
- Each work entry includes description with responsibilities/achievements
- Project entries include name, tech, description, and image
- PDF download link works and downloads the file
- No broken images

---

## 8. Acceptance Criteria

- [ ] Portfolio page accessible at `/portfolio`
- [ ] Education section: ≥ 1 entry with institution, degree/program, and dates
- [ ] Education entries in reverse chronological order
- [ ] Work section: ≥ 1 entry with title, org, dates, and description
- [ ] Work entries in reverse chronological order
- [ ] Projects section: ≥ 1 project with name, tech, description, and image
- [ ] Download CV button works and downloads the PDF
- [ ] At least 2 AI-generated images with `alt` text
- [ ] AI tool documented in a comment near each AI-generated image
- [ ] Page has ≥ 3 distinct, visually separated sections
- [ ] Fully responsive — no overflow on mobile
- [ ] No console errors
