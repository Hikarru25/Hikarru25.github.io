// MainLayout.jsx — wraps every page with Header + Footer
// Every page in the app renders inside this wrapper
// This pattern avoids repeating Header/Footer in every page component
import Header from './Header'
import Footer from './Footer'

export default function MainLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      {/* children = whatever page is currently active (injected by React Router) */}
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  )
}
