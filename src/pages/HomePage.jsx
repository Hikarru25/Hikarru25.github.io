// HomePage.jsx — Home page at route "/"
// Sections: Hero → Technical Skills → Soft Skills
import { Code2, Server, Database, GitBranch, Lightbulb, MessageSquare, BookOpen, Target } from 'lucide-react'
import styles from './HomePage.module.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const techSkills = [
  {
    icon: <Code2 size={32} />,
    title: 'React & Vite',
    text: 'Building modern, component-based UIs with React and Vite for fast, dynamic web experiences.',
  },
  {
    icon: <Server size={32} />,
    title: 'Node.js & Express',
    text: 'Designing and consuming RESTful APIs with Node.js and Express for scalable server-side logic.',
  },
  {
    icon: <Database size={32} />,
    title: 'Databases & Supabase',
    text: 'Structuring relational data, writing SQL queries, and managing authentication with Supabase.',
  },
  {
    icon: <GitBranch size={32} />,
    title: 'Git & GitHub',
    text: 'Version control, branching strategies, and automated CI/CD deployment workflows.',
  },
]

const softSkills = [
  {
    icon: <Lightbulb size={32} />,
    title: 'Strategic Thinking',
    text: '15 years of digital product strategy means I understand business goals before writing a single line of code.',
  },
  {
    icon: <MessageSquare size={32} />,
    title: 'Communication',
    text: 'Translating complex technical concepts into clear language for both technical and non-technical stakeholders.',
  },
  {
    icon: <BookOpen size={32} />,
    title: 'Continuous Learning',
    text: 'Passionate about acquiring new skills daily — from new frameworks to new methodologies.',
  },
  {
    icon: <Target size={32} />,
    title: 'Problem Solving',
    text: 'Approaching challenges analytically, breaking down complexity into manageable, actionable steps.',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

// SkillCard: reused for both tech and soft skills sections
// Props: icon (JSX), title (string), text (string)
function SkillCard({ icon, title, text }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{text}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.heroGreeting}>Hi, I'm</p>
          <h1 className={styles.heroName}>Jenny</h1>
          <p className={styles.heroTitle}>Full Stack Developer</p>
          <p className={styles.heroBio}>
            With 15 years in health tech business strategy, I now build full-stack
            products end to end — from database schema to polished UI. I bridge
            the gap between business needs and technical execution, turning complex
            problems into clean, maintainable solutions.
          </p>
          <a href="/contact" className={styles.heroBtn}>Get in touch</a>
        </div>

        <div className={styles.heroImageWrapper}>
          {/*
            AI-generated using: [Add your AI tool name here, e.g. Midjourney / DALL·E / Adobe Firefly]
            Purpose: Hero portrait / avatar for the landing page
            Replace this placeholder div with:
            <img src={heroImage} alt="Jenny — Full Stack Developer" className={styles.heroImage} />
            and add: import heroImage from '../assets/hero-image.png'
          */}
          <div className={styles.heroImagePlaceholder} aria-label="Jenny — Full Stack Developer">
            <span className={styles.heroImageInitial}>J</span>
          </div>
        </div>
      </section>

      {/* ── Technical Skills Section ────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          {/*
            AI-generated using: [Add your AI tool name here]
            Purpose: Decorative illustration for the skills section
            Replace with: <img src={skillsImage} alt="Visual representation of technical skills" className={styles.sectionIllustration} />
            and add: import skillsImage from '../assets/skills-image.png'
          */}
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <p className={styles.sectionSubtitle}>Tools and technologies I work with</p>
        </div>
        <div className={styles.grid}>
          {techSkills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

      {/* ── Soft Skills Section ─────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What I Bring to the Table</h2>
          <p className={styles.sectionSubtitle}>Beyond the code</p>
        </div>
        <div className={styles.grid}>
          {softSkills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

    </div>
  )
}
