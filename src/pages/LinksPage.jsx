// LinksPage.jsx — Links page at route "/links"
// Displays a grid of curated external link cards
import { ExternalLink } from 'lucide-react'
import styles from './LinksPage.module.css'

// ─── Data ─────────────────────────────────────────────────────────────────────
// To add a new link: add one object to this array — no JSX changes needed
const links = [
  {
    id: 1,
    title: 'GitHub',
    description:
      'Browse my public repositories, contributions, and open source work. This is where all my code lives.',
    url: 'https://github.com/Hikarru25',
    // AI-generated using: [Add tool name — e.g. Midjourney / DALL·E / Adobe Firefly]
    // Replace null with: import githubImg from '../assets/link-github.png'
    image: null,
    imageAlt: 'GitHub profile thumbnail',
    // Fallback icon color when no image is set
    color: '#24292e',
  },
  {
    id: 2,
    title: 'LinkedIn',
    description:
      'My professional profile: work history in health technology and software development, recommendations, and career highlights.',
    url: 'https://linkedin.com/in/jenny', // 🔁 Replace with your real LinkedIn URL
    // AI-generated using: [Add tool name]
    image: null,
    imageAlt: 'LinkedIn profile thumbnail',
    color: '#0077b5',
  },
  {
    id: 3,
    title: 'YouTube',
    description:
      'My video content — elevator pitches, project demos, and walkthroughs of the things I build.',
    url: 'https://youtube.com/@jenny', // 🔁 Replace with your real YouTube URL
    // AI-generated using: [Add tool name]
    image: null,
    imageAlt: 'YouTube channel thumbnail',
    color: '#ff0000',
  },
]

// ─── LinkCard ─────────────────────────────────────────────────────────────────
// Props: title, description, url, image, imageAlt, color
// - If image is provided → show it
// - If no image yet → show a colored placeholder with the first letter of the title
function LinkCard({ title, description, url, image, imageAlt, color }) {
  return (
    // The whole card is a link — opens in new tab
    // rel="noopener noreferrer" is a security requirement for target="_blank":
    //   noopener  → prevents the new tab from accessing window.opener (tab hijacking)
    //   noreferrer → hides the referring URL from the destination site
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`Visit ${title} — opens in new tab`}
    >
      <div className={styles.cardImageWrapper}>
        {image ? (
          <img src={image} alt={imageAlt} className={styles.cardImage} />
        ) : (
          // Placeholder until AI image is added
          <div
            className={styles.cardImagePlaceholder}
            style={{ backgroundColor: color + '18', borderColor: color + '40' }}
            aria-label={imageAlt}
          >
            <span className={styles.cardInitial} style={{ color }}>
              {title[0]}
            </span>
          </div>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTitleRow}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <ExternalLink size={16} className={styles.cardIcon} aria-hidden="true" />
        </div>
        <p className={styles.cardDesc}>{description}</p>
      </div>
    </a>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LinksPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Links</h1>
        <p className={styles.pageSubtitle}>Find me across the web</p>
      </section>

      <section className={styles.grid}>
        {links.map((link) => (
          <LinkCard key={link.id} {...link} />
        ))}
      </section>
    </div>
  )
}
