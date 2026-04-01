// MainLayout.jsx — wraps every page with Header + Footer
// Every page in the app renders inside this wrapper
// This pattern avoids repeating Header/Footer in every page component
import Header from './Header'
import Footer from './Footer'
import styles from './MainLayout.module.css'

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  )
}
