import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BrandMark from '@components/common/BrandMark'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Products',     path: '/products' },
  { label: 'Services',     path: '/services' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Research',     path: '/insights' },
  { label: 'Courses',      path: '/courses' },
  { label: 'Publications', path: '/publications' },
  { label: 'About',        path: '/about' },
  { label: 'Contact',      path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isActivePath = (path) => pathname === path || pathname.startsWith(`${path}/`)
  const usesDarkHero = ['/products', '/services', '/about', '/case-studies', '/insights', '/labs', '/publications', '/careers', '/courses'].some((path) => isActivePath(path))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${usesDarkHero && !scrolled ? styles.onDark : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <BrandMark className={styles.logoSvg} title="RhemaAI Solutions Ltd logo" />
          </div>
          <span className={styles.brandName}>
            Rhema<span className={styles.brandAccent}>AI</span> Solutions Ltd
          </span>
        </Link>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${styles.navLink} ${isActivePath(link.path) ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={menuOpen ? styles.barTop + ' ' + styles.open : styles.barTop} />
            <span className={menuOpen ? styles.barMid + ' ' + styles.open : styles.barMid} />
            <span className={menuOpen ? styles.barBot + ' ' + styles.open : styles.barBot} />
          </button>
        </div>
      </motion.nav>

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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
