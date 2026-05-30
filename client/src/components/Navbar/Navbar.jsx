import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Services',     path: '/services' },
  { label: 'About',        path: '/about' },
  { label: 'Case Studies', path: '/#case-studies' },
  { label: 'Insights',     path: '/insights' },
  { label: 'Contact',      path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className={styles.brandName}>
            Rhema<span className={styles.brandAccent}>AI</span> Technologies
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className={styles.navRight}>
          <Link to="/contact" className={styles.ctaBtn}>
            Book Consultation
            <span className={styles.ctaArrow}>→</span>
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? styles.barTop + ' ' + styles.open : styles.barTop} />
            <span className={menuOpen ? styles.barMid + ' ' + styles.open : styles.barMid} />
            <span className={menuOpen ? styles.barBot + ' ' + styles.open : styles.barBot} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={link.path} className={styles.mobileLink}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/contact" className={styles.mobileCta}>
              Book a Consultation →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
