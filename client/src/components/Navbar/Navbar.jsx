import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandMark from '@components/common/BrandMark'
import { PUBLICATION_TYPES } from '../../data/publicationTypes'
import { COURSE_CATEGORIES } from '../../data/courseCategories'
import { PRODUCT_CATEGORIES } from '../../data/productCategories'
import { RESEARCH_CATEGORIES } from '../../data/researchCategories'
import { CASE_STUDY_CATEGORIES } from '../../data/caseStudyCategories'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Nexus AOS', path: '/nexus-aos' },
  {
    label: 'Products',
    path: '/products',
    children: PRODUCT_CATEGORIES.map((category) => ({
      label: category.name,
      path: `/products?category=${category.id}#product-suite`,
      category: category.id,
    })),
  },
  { label: 'Services',     path: '/services' },
  {
    label: 'Case Studies',
    path: '/case-studies',
    children: [
      { label: 'All', path: '/case-studies#case-studies', category: 'all' },
      ...CASE_STUDY_CATEGORIES.map((category) => ({
        label: category.name,
        path: `/case-studies?category=${category.id}#case-studies`,
        category: category.id,
      })),
    ],
  },
  {
    label: 'Research',
    path: '/insights',
    children: RESEARCH_CATEGORIES.map((category) => ({
      label: category.label,
      path: category.value === 'all'
        ? '/insights#research-notes'
        : `/insights?category=${category.value}#research-notes`,
      category: category.value,
    })),
  },
  {
    label: 'Courses',
    path: '/courses',
    children: COURSE_CATEGORIES.map((category) => ({
      label: category.label,
      path: category.key === 'all'
        ? '/courses#course-catalogue'
        : `/courses?category=${category.key}#course-catalogue`,
      category: category.key,
    })),
  },
  {
    label: 'Publications',
    path: '/publications',
    children: PUBLICATION_TYPES.map((type) => ({
      label: type.label,
      path: type.value === 'all'
        ? '/publications#publication-catalogue'
        : `/publications?category=${type.value}#publication-catalogue`,
      category: type.value,
    })),
  },
  { label: 'About',        path: '/about' },
  { label: 'Contact',      path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  const { pathname, search } = useLocation()
  const activeCategory = new URLSearchParams(search).get('category') || 'all'
  const isActivePath = (path) => pathname === path || pathname.startsWith(`${path}/`)
  const darkHeroPaths = ['/', '/nexus-aos', '/products', '/services', '/about', '/case-studies', '/insights', '/labs', '/publications', '/careers', '/courses']
  const usesDarkHero = darkHeroPaths.some((path) => pathname === path || (path !== '/' && pathname.startsWith(`${path}/`)))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname, search])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1061px)')
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${usesDarkHero && !scrolled ? styles.onDark : ''}`}
      >
        <Link to="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <BrandMark className={styles.logoImage} title="RhemaAI Solutions Ltd logo" />
          </div>
          <span className={styles.brandName}>
            Rhema<span className={styles.brandAccent}>AI</span> Solutions Ltd
          </span>
        </Link>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.path} className={styles.navItem}>
              <Link
                to={link.path}
                aria-current={isActivePath(link.path) ? 'page' : undefined}
                className={`${styles.navLink} ${isActivePath(link.path) ? styles.active : ''}`}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className={styles.dropdown}>
                  {link.children.map((child) => (
                    <Link key={child.path} to={child.path} aria-current={pathname === link.path && activeCategory === child.category ? 'page' : undefined}>{child.label}</Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <button
            ref={menuButton}
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={menuOpen ? styles.barTop + ' ' + styles.open : styles.barTop} />
            <span className={menuOpen ? styles.barMid + ' ' + styles.open : styles.barMid} />
            <span className={menuOpen ? styles.barBot + ' ' + styles.open : styles.barBot} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuVisible : ''}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <div key={link.path}>
            <Link to={link.path} className={styles.mobileLink} aria-current={isActivePath(link.path) ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{link.label}</Link>
            {link.children && (
              <div className={styles.mobileSubLinks}>
                {link.children.map((child) => <Link key={child.path} to={child.path} aria-current={pathname === link.path && activeCategory === child.category ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{child.label}</Link>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
