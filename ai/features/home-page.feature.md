# 🤖 Feature Specification — Home Page

> ⚠️ Use this document alongside `../../ai-spec.md` (Global AI Spec).  
> The global spec defines all standards, conventions, and constraints.

---

## 1. Feature Goal & Scope

### Goal
Build the default landing page at `/` that introduces Jenny to visitors: who she is, what she does, her technical skills, and her soft skills — all presented in a visually organized, responsive layout.

### In Scope
- Introduction section (name, role/title, bio)
- Technical skills section (≥ 3 skills with icons + supporting text)
- Soft skills / talents section (≥ 3 with icons + supporting text)
- At least 2 AI-generated images
- Responsive layout

### Out of Scope
- Contact form (Feature 6)
- Portfolio/resume content (Feature 4)
- Navigation (Feature 2)

---

## 2. Requirements Breakdown & User Flow

### Page Sections (top to bottom)
1. **Hero / Introduction** — Name, role, short bio paragraph
2. **Technical Skills** — Grid or card layout with skill icons + descriptions
3. **Soft Skills / Talents** — Same visual pattern as technical skills

### User Flow
- User lands on `https://Hikarru25.github.io`
- Sees Jenny's name and role immediately (above the fold)
- Scrolls down to explore skills
- Can navigate to other pages via Header (Feature 2)

---

## 3. Files Involved

| File | Action | Description |
|------|--------|-------------|
| `src/pages/HomePage.jsx` | Create | Main Home page component |
| `src/pages/HomePage.module.css` | Create | Home page styles |
| `src/assets/hero-image.png` | Add | AI-generated hero/intro image |
| `src/assets/skills-image.png` | Add | AI-generated skills section image |

---

## 4. Content & Data

### Introduction Section
- **Name:** Jenny
- **Role/Title:** Full Stack Developer | Health Tech Strategist
- **Bio:** Short paragraph (3–5 sentences) about Jenny's background — 15 years in health tech business strategy, now building full-stack products end to end.

### Technical Skills (minimum 3)
| Skill | Icon (Lucide) | Supporting Text |
|-------|--------------|-----------------|
| React | `<Code2 />` | Building modern, component-based UIs with React and Vite for fast, dynamic web experiences. |
| Node.js & Express | `<Server />` | Designing and consuming RESTful APIs with Node.js and Express for scalable server-side logic. |
| Databases & Supabase | `<Database />` | Structuring relational data, writing SQL queries, and managing authentication with Supabase. |
| Git & GitHub | `<GitBranch />` | Version control, branching strategies, and automated CI/CD deployment workflows. |

### Soft Skills / Talents (minimum 3)
| Skill | Icon (Lucide) | Supporting Text |
|-------|--------------|-----------------|
| Strategic Thinking | `<Lightbulb />` | 15 years of digital product strategy means I understand business goals before writing a single line of code. |
| Communication | `<MessageSquare />` | Translating complex technical concepts into clear language for both technical and non-technical stakeholders. |
| Continuous Learning | `<BookOpen />` | Passionate about acquiring new skills daily — from new frameworks to new methodologies. |
| Problem Solving | `<Target />` | Approaching challenges analytically, breaking down complexity into manageable, actionable steps. |

---

## 5. AI-Generated Images

| Image | AI Tool | Alt Text | Location |
|-------|---------|----------|----------|
| Hero/intro image | Document tool used | `"Jenny — Full Stack Developer"` | Hero section |
| Skills illustration | Document tool used | `"Visual representation of technical skills"` | Skills section or decorative |

> Add a comment near each `<img>` tag: `{/* AI-generated using [Tool Name] */}`

---

## 6. Validations & Expected Behavior

- Page is accessible at `/` (root URL)
- Page is the default landing page (no redirect from `/`)
- No broken images
- All images have descriptive `alt` text
- Sections are visually separated (spacing, background color, or dividers)

---

## 7. Acceptance Criteria

- [ ] Home page loads at `/` with no redirect
- [ ] Introduction section displays Jenny's name prominently
- [ ] A role/title and bio paragraph are visible
- [ ] Technical skills section shows ≥ 3 skills, each with an icon and supporting text
- [ ] Soft skills section shows ≥ 3 skills, each with an icon and supporting text
- [ ] Both skill sections are visually organized (cards, grid, or styled list)
- [ ] At least 2 AI-generated images are present with `alt` text
- [ ] AI tool is documented in a comment near each AI-generated image
- [ ] Page has ≥ 3 distinct, visually separated sections
- [ ] Fully responsive — no overflow, readable on mobile
- [ ] No console errors
