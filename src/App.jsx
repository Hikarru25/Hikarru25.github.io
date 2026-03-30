// App.jsx — the routing hub of the entire app
//
// BrowserRouter: uses the real URL bar (e.g. /portfolio, /contact)
//   instead of hash-based URLs (#/portfolio).
//
// Routes + Route: React Router v6 way to declare which component
//   renders for each URL path.
//
// MainLayout wraps every route so Header + Footer always appear.
//
// Note: /login and /backoffice are intentionally NOT in the Header nav
//   (secret/protected routes — see ai-spec.md Section 7)
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import LinksPage from './pages/LinksPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import BackOfficePage from './pages/BackOfficePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages — wrapped in MainLayout (Header + Footer) */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/portfolio" element={<MainLayout><PortfolioPage /></MainLayout>} />
        <Route path="/links" element={<MainLayout><LinksPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />

        {/* Secret/protected pages — still wrapped in MainLayout for consistent shell */}
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/backoffice" element={<MainLayout><BackOfficePage /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

// NOTE: removed Vite boilerplate — do not re-add

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
