// PortfolioPage.jsx — Portfolio / Resume page at route "/portfolio"
import { Download, GitBranch, ExternalLink, Award } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import codeboxxLogo from '../assets/codeboxx-logo.jpg'
import styles from './PortfolioPage.module.css'

// ─── Icon map (tech name → devicon SVG path) ─────────────────────────────────
const ICON_MAP = {
  'HTML5':          'html5/html5-original',
  'CSS3':           'css3/css3-original',
  'JavaScript':     'javascript/javascript-original',
  'Bootstrap':      'bootstrap/bootstrap-original',
  'Node.js':        'nodejs/nodejs-plain',
  'Express.js':     'express/express-original',
  'MongoDB':        'mongodb/mongodb-original',
  'React':          'react/react-original',
  'React Native':   'reactnative/reactnative-original',
  'Java':           'java/java-original',
  'Spring Boot':    'spring/spring-original',
  'MySQL':          'mysql/mysql-original',
  'Vite':           'vitejs/vitejs-original',
  'Supabase':       'supabase/supabase-original',
  'GitHub Actions': 'github/github-original',
  'GitHub Pages':   'github/github-original',
  'Selenium IDE':   'selenium/selenium-original',
  'Postman':        'postman/postman-original',
}

// ─── Data ────────────────────────────────────────────────────────────────────
function getData(t) {
  return {
    projects: [
      {
        name: t('portfolio.project1Name'),
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Node.js', 'Express.js', 'MongoDB', 'React', 'Session Auth'],
        description: t('portfolio.project1Desc'),
        github: 'https://github.com/Hikarru25',
        live: null,
        image: null,
        code: `const router = express.Router()\nrouter.get('/elevators', auth, async (req, res) => {\n  const data = await Elevator.find({ status: 'active' })\n  res.json(data)\n})\napp.use(session({ secret: process.env.SECRET }))\n\n<Navbar bg="dark" expand="lg">\n  <Container>\n    <Navbar.Brand>Rocket Elevators</Navbar.Brand>\n  </Container>\n</Navbar>`,
      },
      {
        name: t('portfolio.project2Name'),
        tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Lighthouse', 'Selenium IDE'],
        description: t('portfolio.project2Desc'),
        github: 'https://github.com/Hikarru25',
        live: null,
        image: null,
        code: `const Post = mongoose.model('Post', {\n  title: String,\n  body: String,\n  author: { type: ObjectId, ref: 'User' },\n  createdAt: { type: Date, default: Date.now }\n})\nrouter.get('/posts', paginate, async (req, res) => {\n  const posts = await Post.find().populate('author')\n  res.json(posts)\n})`,
      },
      {
        name: t('portfolio.project3Name'),
        tech: ['Java', 'OOP', 'Inheritance', 'Polymorphism'],
        description: t('portfolio.project3Desc'),
        github: 'https://github.com/Hikarru25',
        live: null,
        image: null,
        code: `public class SavingsAccount extends BankAccount {\n  private double interestRate;\n\n  public SavingsAccount(double balance, double rate) {\n    super(balance);\n    this.interestRate = rate;\n  }\n\n  @Override\n  public double getBalance() {\n    return super.getBalance() * (1 + interestRate);\n  }\n}`,
      },
      {
        name: t('portfolio.project4Name'),
        tech: ['Java', 'Spring Boot', 'JPA/Hibernate', 'MySQL', 'Thymeleaf', 'JUnit'],
        description: t('portfolio.project4Desc'),
        github: 'https://github.com/Hikarru25',
        live: null,
        image: null,
        code: `@RestController\n@RequestMapping("/api/menu")\npublic class MenuController {\n  @Autowired\n  private MenuService menuService;\n\n  @GetMapping\n  public List<MenuItem> getAll() {\n    return menuService.findAll();\n  }\n\n  @PostMapping\n  public MenuItem create(@RequestBody MenuItem item) {\n    return menuService.save(item);\n  }\n}`,
      },
      {
        name: t('portfolio.project5Name'),
        tech: ['React Native', 'JavaScript', 'Expo', 'React Navigation', 'AsyncStorage', 'REST API'],
        description: t('portfolio.project5Desc'),
        github: 'https://github.com/Hikarru25',
        live: null,
        image: null,
        code: `const Stack = createNativeStackNavigator()\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator initialRouteName="Home">\n        <Stack.Screen name="Orders" component={OrdersScreen} />\n        <Stack.Screen name="Delivery" component={DeliveryScreen} />\n        <Stack.Screen name="Profile" component={ProfileScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  )\n}`,
      },
      {
        name: t('portfolio.project6Name'),
        tech: ['React', 'Vite', 'Supabase', 'GitHub Actions', 'GitHub Pages'],
        description: t('portfolio.project6Desc'),
        github: 'https://github.com/Hikarru25',
        live: 'https://Hikarru25.github.io',
        image: null,
        code: `const { data } = await supabase\n  .from('messages')\n  .select('*')\n  .order('created_at', { ascending: false })\n\nexport default function PortfolioPage() {\n  const { t } = useLanguage()\n  const { projects } = getData(t)\n  return (\n    <main className={styles.page}>\n      {projects.map((p, i) => (\n        <ProjectCard key={p.name} {...p} index={i} />\n      ))}\n    </main>\n  )\n}`,
      },
      {
        name: t('portfolio.project7Name'),
        tech: ['Product Ownership', 'Agile / Scrum', 'Backlog Management', 'User Story Writing', 'Stakeholder Management', 'Digital Health'],
        description: t('portfolio.project7Desc'),
        github: null,
        live: 'https://digitalx.undp.org/speetar_1.html',
        image: null,
        code: `// Speetar — UNDP DigitalX\n// Telehealth platform for conflict-affected communities\n\nconst stakeholders = [\n  'UNDP Libya',\n  'Harvard Innovation Labs',\n  'MIT Legatum Center',\n  'Echoing Green',\n  'Aspen Institute',\n]\n\nconst impact = {\n  beneficiaries: '1.8M+',\n  countries: ['Libya', 'Jordan', 'Tunisia'],\n  reach: '3.2M via health education',\n}`,
      },
      {
        name: t('portfolio.project8Name'),
        tech: ['React', 'TypeScript', 'Vite', 'Selenium IDE', 'Postman', 'QA Testing', 'REST API'],
        description: t('portfolio.project8Desc'),
        github: null,
        live: 'https://epiprotect.app/',
        image: null,
        code: `// WoundFlow — EpiProtect / S2Medical AB\n// Evidence-based wound care training platform\n\n// QA test suite — clinical case flow\ndescribe('Clinical Case Training', () => {\n  it('loads wound scenario', async () => {\n    const res = await api.get('/cases/wound-001')\n    expect(res.status).toBe(200)\n    expect(res.data.category).toBe('chronic')\n  })\n\n  it('submits diagnosis decision', async () => {\n    const payload = { caseId: 'wound-001', answer: 'debridement' }\n    const res = await api.post('/cases/submit', payload)\n    expect(res.data.correct).toBe(true)\n  })\n})`,
      },
    ],
    education: [
      {
        school: t('portfolio.edu1School'),
        degree: t('portfolio.edu1Degree'),
        dates: '2025 – 2026',
        description: t('portfolio.edu1Desc'),
      },
      {
        school: t('portfolio.edu2School'),
        degree: t('portfolio.edu2Degree'),
        dates: '20XX – 20XX',
        description: t('portfolio.edu2Desc'),
      },
    ],
    certifications: [
      {
        name: t('portfolio.certCodeboxxName'),
        issuer: 'CodeBoxx',
        domain: t('portfolio.certCodeboxxDomain'),
        services: t('portfolio.certCodeboxxServices'),
        level: t('portfolio.certLevelBootcamp'),
      },
      {
        name: 'Advanced Testing Practices Using AWS DevOps Tools',
        issuer: 'Amazon Web Services',
        domain: 'DevOps',
        services: 'AWS Lambda, AWS CodePipeline',
        level: t('portfolio.certLevelAdvanced'),
        duration: '2h 30m',
      },
      {
        name: 'AWS Command Line Interface (AWS CLI) Getting Started',
        issuer: 'Amazon Web Services',
        domain: 'Developing',
        services: 'AWS CLI',
        level: t('portfolio.certLevelFundamental'),
        duration: '1h',
      },
      {
        name: 'Getting Started with DevOps on AWS',
        issuer: 'Amazon Web Services',
        domain: 'DevOps',
        services: 'AWS CodeDeploy, AWS CodePipeline, AWS CodeCommit',
        level: t('portfolio.certLevelFundamental'),
        duration: '1h',
      },
    ],
    workExperience: [
      {
        title: t('portfolio.work1Title'),
        org: t('portfolio.work1Org'),
        dates: '20XX – Present',
        description: t('portfolio.work1Desc'),
      },
      {
        title: t('portfolio.work2Title'),
        org: t('portfolio.work2Org'),
        dates: '20XX – 20XX',
        description: t('portfolio.work2Desc'),
      },
      {
        title: t('portfolio.work3Title'),
        org: t('portfolio.work3Org'),
        dates: '20XX – 20XX',
        description: t('portfolio.work3Desc'),
      },
    ],
  }
}

// ─── Sub-components ────────────────────────────────────────────────────────────────
function ProjectCardImage({ tech, code }) {
  const icons = [...new Set(tech.filter(t => ICON_MAP[t]).map(t => ICON_MAP[t]))]
  return (
    <div className={styles.projectMosaic}>
      <pre className={styles.mosaicCode}>{code}</pre>
      <div className={styles.mosaicIcons}>
        {icons.map(path => (
          <img
            key={path}
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`}
            alt={path}
            className={styles.mosaicIcon}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ name, tech, description, github, live, image, code, index }) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <div className={styles.projectCard}>
      {/* Number badge */}
      <span className={styles.projectNum}>{num}</span>

      {/* Image or mosaic */}
      <div className={styles.projectImageWrapper}>
        {image ? (
          <img src={image} alt={name} className={styles.projectImage} />
        ) : (
          <ProjectCardImage tech={tech} code={code} />
        )}
      </div>

      {/* Body */}
      <div className={styles.projectBody}>
        <h3 className={styles.projectName}>{name}</h3>
        <div className={styles.techTags}>
          {tech.map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>
        <p className={styles.projectDesc}>{description}</p>

        {/* Links */}
        <div className={styles.projectLinks}>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <GitBranch size={15} />
              GitHub
            </a>
          )}
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className={`${styles.linkBtn} ${styles.linkBtnFill}`}>
              <ExternalLink size={15} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}


function CertCard({ name, issuer, domain, services, level }) {
  const isCodeboxx = issuer.toLowerCase().includes('codeboxx')
  return (
    <div className={styles.certCard}>
      <div className={styles.certCardTop}>
        {isCodeboxx ? (
          <img
            src={codeboxxLogo}
            alt="CodeBoxx"
            className={styles.certLogoImg}
          />
        ) : (
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
            alt="AWS"
            className={styles.certLogoImg}
          />
        )}
        <p className={styles.certIssuer}>{issuer}</p>
      </div>
      <h3 className={styles.certName}>{name}</h3>
      <div className={styles.certMeta}>
        <span className={styles.certBadge}>{domain}</span>
        <span className={styles.certBadge}>{level}</span>
      </div>
      <p className={styles.certServices}>{services}</p>
    </div>
  )
}


// ─── Page ────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const { t } = useLanguage()
  const { projects, certifications } = getData(t)

  return (
    <div className={styles.page}>

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <section className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div>
            <h1 className={styles.pageTitle}>{t('portfolio.title')}</h1>
            <p className={styles.pageSubtitle}>{t('portfolio.subtitle')}</p>
            <div className={styles.pageHeaderActions}>
              <a href="#certifications" className={styles.anchorBtn}>
                <Award size={15} />
                {t('portfolio.certsTitle')}
              </a>
              <a
                href="/assets/Jenny-cv.pdf"
                download
                className={styles.downloadBtn}
                aria-label="Download CV"
              >
                <Download size={17} />
                {t('portfolio.downloadCV')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{t('portfolio.projectsTitle')}</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.name} {...project} index={i} />
          ))}
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────────────── */}
      <section id="certifications" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionHead}>
          <Award size={20} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>{t('portfolio.certsTitle')}</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.certsGrid}>
          {certifications.map((cert) => (
            <CertCard key={cert.name} {...cert} />
          ))}
        </div>
      </section>

      {/* ── Bottom CV CTA ──────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionCta}`}>
        <p className={styles.ctaText}>{t('portfolio.ctaText')}</p>
        <a
          href="/assets/Jenny-cv.pdf"
          download
          className={styles.downloadBtn}
          aria-label="Download full CV"
        >
          <Download size={17} />
          {t('portfolio.downloadFull')}
        </a>
      </section>

    </div>
  )
}

