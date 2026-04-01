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
