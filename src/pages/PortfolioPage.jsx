// PortfolioPage.jsx — Portfolio / Resume page at route "/portfolio"
// Sections: Page Header → Education → Work Experience → Projects → Download CV
import { GraduationCap, Briefcase, FolderGit2, Download } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import styles from './PortfolioPage.module.css'

// ─── Data ────────────────────────────────────────────────────────────────────
// 📝 Replace placeholder content with Jenny's real info

const education = [
  {
    school: 'CodeBoxx Academy',
    degree: 'Full Stack Web Development',
    dates: '2025 – 2026',
    description: 'Intensive full-stack bootcamp covering React, Node.js, Supabase, CI/CD, and agile development practices.',
  },
  {
    school: 'Placeholder University',
    degree: 'Placeholder Degree / Program',
    dates: '20XX – 20XX',
    description: 'Replace with your real education history.',
  },
]

const workExperience = [
  {
    title: 'Placeholder Job Title',
    org: 'Placeholder Organization',
    dates: '20XX – Present',
    description: 'Replace with your most recent role. Describe your responsibilities and key achievements.',
  },
  {
    title: 'Placeholder Previous Role',
    org: 'Placeholder Organization',
    dates: '20XX – 20XX',
    description: 'Replace with a previous role. Describe responsibilities and impact.',
  },
  {
    title: '15 Years in Health Tech Strategy',
    org: '[Add your companies here]',
    dates: '20XX – 20XX',
    description: 'Digital product strategy and transformation across the health tech sector. Add your specific roles and organizations.',
  },
]

const projects = [
  {
    name: 'Personal Portfolio Website',
    tech: ['React', 'Vite', 'Supabase', 'GitHub Actions'],
    description:
      'A personal portfolio and admin back office built from scratch. Demonstrates full-stack skills including CI/CD deployment, Supabase authentication, and responsive design.',
    // AI-generated using: [Add tool name — e.g. Midjourney / DALL·E / Adobe Firefly]
    image: null, // Replace with: import projectImg from '../assets/portfolio-image-1.png'
    imageAlt: 'Personal Portfolio Website project preview',
  },
  {
    name: 'Placeholder Project 2',
    tech: ['Placeholder', 'Tech', 'Stack'],
    description: 'Replace with a real project description. What did it do? What problem did it solve?',
    image: null,
    imageAlt: 'Placeholder Project 2 preview',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

// TimelineItem: used for both Education and Work Experience
// Props: title, subtitle, dates, description
function TimelineItem({ title, subtitle, dates, description }) {
  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineDot} aria-hidden="true" />
      <div className={styles.timelineContent}>
        <div className={styles.timelineHeader}>
          <h3 className={styles.timelineTitle}>{title}</h3>
          <span className={styles.timelineDates}>{dates}</span>
        </div>
        <p className={styles.timelineSubtitle}>{subtitle}</p>
        <p className={styles.timelineDesc}>{description}</p>
      </div>
    </div>
  )
}

// ProjectCard: one card per project
function ProjectCard({ name, tech, description, image, imageAlt }) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImageWrapper}>
        {image ? (
          // AI-generated image — add comment with tool name when you add the real image
          <img src={image} alt={imageAlt} className={styles.projectImage} />
        ) : (
          // Placeholder until AI image is added
          <div className={styles.projectImagePlaceholder} aria-label={imageAlt}>
            <FolderGit2 size={40} />
          </div>
        )}
      </div>
      <div className={styles.projectBody}>
        <h3 className={styles.projectName}>{name}</h3>
        <div className={styles.techTags}>
          {tech.map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>
        <p className={styles.projectDesc}>{description}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { t } = useLanguage()

  return (
    <div className={styles.page}>

      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <section className={styles.pageHeader}>
        {/*
          AI-generated using: [Add tool name]
          Purpose: Portfolio page header illustration
          Replace the div below with:
          <img src={portfolioImg} alt="Portfolio page header illustration" className={styles.headerIllustration} />
        */}
        <h1 className={styles.pageTitle}>{t('portfolio.title')}</h1>
        <p className={styles.pageSubtitle}>{t('portfolio.subtitle')}</p>
        <a
          href="/assets/jenny-cv.pdf"
          download
          className={styles.downloadBtn}
          aria-label="Download Jenny's CV as PDF"
        >
          <Download size={18} />
          {t('portfolio.downloadCV')}
        </a>
      </section>

      {/* ── Education ──────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <GraduationCap size={24} />
          <h2>{t('portfolio.educationTitle')}</h2>
        </div>
        <div className={styles.timeline}>
          {education.map((item) => (
            <TimelineItem
              key={item.school}
              title={item.school}
              subtitle={item.degree}
              dates={item.dates}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* ── Work Experience ─────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionTitle}>
          <Briefcase size={24} />
          <h2>{t('portfolio.workTitle')}</h2>
        </div>
        <div className={styles.timeline}>
          {workExperience.map((item) => (
            <TimelineItem
              key={item.title + item.org}
              title={item.title}
              subtitle={item.org}
              dates={item.dates}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <FolderGit2 size={24} />
          <h2>{t('portfolio.projectsTitle')}</h2>
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </section>

      {/* ── Bottom Download CTA ─────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionCta}`}>
        <p className={styles.ctaText}>{t('portfolio.ctaText')}</p>
        <a
          href="/assets/jenny-cv.pdf"
          download
          className={styles.downloadBtn}
          aria-label="Download Jenny's CV as PDF"
        >
          <Download size={18} />
          {t('portfolio.downloadFull')}
        </a>
      </section>

    </div>
  )
}

