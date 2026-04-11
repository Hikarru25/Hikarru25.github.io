// LinksPage.jsx — Links page at route "/links"
// Displays a grid of curated external link cards
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import styles from './LinksPage.module.css'

// ─── Data ─────────────────────────────────────────────────────────────────────
function getLinks(t) {
  return [
    {
      id: 1,
      title: 'GitHub',
      description: t('links.githubDesc'),
      url: 'https://github.com/Hikarru25',
      image: null,
      imageAlt: 'GitHub profile thumbnail',
      color: '#24292e',
    },
    {
      id: 2,
      title: 'LinkedIn',
      description: t('links.linkedinDesc'),
      url: 'https://ca.linkedin.com/in/jihanesakhi',
      image: null,
      imageAlt: 'LinkedIn profile thumbnail',
      color: '#0077b5',
    },
    {
      id: 3,
      title: 'YouTube',
      description: t('links.youtubeDesc'),
      url: 'https://www.youtube.com/@HikarruCBXX',
      image: null,
      imageAlt: 'YouTube channel thumbnail',
      color: '#ff0000',
    },
  ]
}

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
  const { t } = useLanguage()
  const links = getLinks(t)

  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t('links.title')}</h1>
        <p className={styles.pageSubtitle}>{t('links.subtitle')}</p>
      </section>

      <section className={styles.grid}>
        {links.map((link) => (
          <LinkCard key={link.id} {...link} />
        ))}
      </section>
    </div>
  )
}
