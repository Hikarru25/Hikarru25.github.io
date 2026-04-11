// HomePage.jsx — Home page at route "/"
// Sections: Hero → Technical Skills → Soft Skills
import { Compass, Sparkles, MessageSquare, RefreshCw, Zap, Users, Target, TrendingUp, Network } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import jennyPhoto from '../assets/jenny-photo.png'
import styles from './HomePage.module.css'

// Inline SVG brand icons (brand logos not in lucide-react)
function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// ─── Technical Skills Data ────────────────────────────────────────────────────

const di = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

const skillNodes = [
  {
    label: 'Frontend',
    color: '#4fa8d5',
    bg: 'rgba(79, 168, 213, 0.08)',
    icons: [
      { src: di('html5'),      alt: 'HTML5' },
      { src: di('css3'),       alt: 'CSS3' },
      { src: di('javascript'), alt: 'JavaScript' },
      { src: di('react'),      alt: 'React' },
      { src: di('vitejs'),     alt: 'Vite' },
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Vite', 'Responsive Design', 'DOM Manipulation', 'React Native (Expo)'],
  },
  {
    label: 'Backend',
    color: '#4caf7d',
    bg: 'rgba(76, 175, 125, 0.08)',
    icons: [
      { src: di('nodejs'),  alt: 'Node.js' },
      { src: di('java'),    alt: 'Java' },
      { src: di('spring'),  alt: 'Spring Boot' },
    ],
    tags: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'REST API Design', 'Middleware', 'Error handling'],
  },
  {
    label: 'Databases',
    color: '#9b7fe8',
    bg: 'rgba(155, 127, 232, 0.08)',
    icons: [
      { src: di('mongodb'),    alt: 'MongoDB' },
      { src: di('mysql'),      alt: 'MySQL' },
      { src: di('postgresql'), alt: 'PostgreSQL' },
      { src: di('supabase'),   alt: 'Supabase' },
    ],
    tags: ['MongoDB', 'Mongoose', 'MySQL', 'Supabase (PostgreSQL)', 'JPA / Hibernate', 'SQL', 'Database schema design'],
  },
  {
    label: 'DevOps & Tools',
    color: '#e8956d',
    bg: 'rgba(232, 149, 109, 0.08)',
    icons: [
      { src: di('git'),                                           alt: 'Git' },
      { src: di('githubactions'),                                 alt: 'GitHub Actions' },
      { src: di('amazonwebservices', 'original-wordmark'),        alt: 'AWS' },
      { src: di('postman'),                                       alt: 'Postman' },
    ],
    tags: ['Git / GitHub', 'GitHub Actions CI/CD', 'Postman', 'Selenium IDE', 'AWS DevOps', 'Unit testing', 'TDD / JUnit'],
  },
  {
    label: 'AI & Security',
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.08)',
    icons: [
      { src: di('supabase'),  alt: 'Supabase Auth' },
      { src: di('selenium'),  alt: 'Selenium' },
    ],
    tags: ['Supabase Auth', 'Authentication & Security', 'AI-assisted development', 'Prompt engineering', 'Accessibility & SEO'],
  },
]

function SkillCard({ label, color, bg, icons, tags }) {
  return (
    <div
      className={styles.skillCard}
      style={{ '--card-color': color, '--card-bg': bg }}
    >
      <div className={styles.cardIcons}>
        {icons.map((icon) => (
          <img key={icon.alt} src={icon.src} alt={icon.alt} className={styles.techIcon} />
        ))}
      </div>
      <p className={styles.cardLabel}>{label}</p>
      <div className={styles.tagsRow}>
        {tags.map((tag) => (
          <span
            key={tag}
            className={styles.tag}
            style={{ '--tag-color': color, '--tag-bg': bg }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Soft Skills Data ─────────────────────────────────────────────────────────

const softSkills = [
  { icon: <Compass size={26} />,       titleKey: 'home.soft9Title', color: '#4fa8d5' },
  { icon: <Sparkles size={26} />,     titleKey: 'home.soft1Title', color: '#4caf7d' },
  { icon: <MessageSquare size={26} />, titleKey: 'home.soft2Title', color: '#9b7fe8' },
  { icon: <RefreshCw size={26} />,     titleKey: 'home.soft3Title', color: '#e8956d' },
  { icon: <Zap size={26} />,           titleKey: 'home.soft4Title', color: '#c084fc' },
  { icon: <Users size={26} />,         titleKey: 'home.soft5Title', color: '#e85d75' },
  { icon: <Target size={26} />,        titleKey: 'home.soft6Title', color: '#4fa8d5' },
  { icon: <TrendingUp size={26} />,    titleKey: 'home.soft7Title', color: '#4caf7d' },
  { icon: <Network size={26} />,       titleKey: 'home.soft8Title', color: '#9b7fe8' },
]

function SoftCard({ icon, titleKey, color, t }) {
  return (
    <div className={styles.softCard} style={{ '--soft-color': color }}>
      <div className={styles.softIcon}>{icon}</div>
      <h3 className={styles.softTitle}>{t(titleKey)}</h3>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className={styles.page}>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className={styles.hero}>

        {/* LEFT: Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profilePhotoWrapper}>
            <img src={jennyPhoto} alt="Jenny" className={styles.profilePhoto} />
          </div>

          <p className={styles.profileRole}>{t('home.role')}</p>
          <p className={styles.profileLocation}>{t('home.location')}</p>

          <div className={styles.profileSocials}>
            <a href="https://github.com/Hikarru25" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <GitHubIcon size={18} />
            </a>
            <a href="https://ca.linkedin.com/in/jihanesakhi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
          </div>

          <a href="/contact" className={styles.sliderBtn} aria-label="Get in touch">
            <span className={styles.sliderThumb}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
            <span className={styles.sliderLabel}>{t('home.cta')}</span>
          </a>
        </div>

        {/* RIGHT: Hero content */}
        <div className={styles.heroContent}>
          <p className={styles.heroGreeting}>{t('home.greeting')}</p>
          <h1 className={styles.heroName}>{t('home.name')}</h1>
          <p className={styles.heroBio}>{t('home.bio')}</p>

          <div className={styles.heroCtas}>
            <a href="/portfolio" className={styles.heroLinkBtn}>{t('home.ctaWork')} →</a>
            <a href="#skills" className={styles.heroLinkBtn}>{t('home.ctaSkills')} ↓</a>
          </div>
        </div>

      </section>

      {/* ── Technical Skills ────────────────────────────────────────────────── */}
      <section className={styles.section} id="skills">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('home.techTitle')}</h2>
          <p className={styles.sectionSubtitle}>{t('home.techSubtitle')}</p>
        </div>
        <div className={styles.skillsGrid}>
          {skillNodes.map((node) => (
            <SkillCard key={node.label} {...node} />
          ))}
        </div>
      </section>

      {/* ── Soft Skills ─────────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('home.softTitle')}</h2>
        </div>
        <div className={styles.softGrid}>
          {softSkills.map(({ titleKey, icon, color }) => (
            <SoftCard key={titleKey} icon={icon} titleKey={titleKey} color={color} t={t} />
          ))}
        </div>
      </section>

    </div>
  )
}
