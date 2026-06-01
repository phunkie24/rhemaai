import { useState } from 'react'
import { Link } from 'react-router-dom'
import { newsletterAPI } from '@utils/api'
import BrandMark from '@components/common/BrandMark'
import styles from './Footer.module.css'

const SERVICES_LINKS = [
  { label: 'Agentic AI Engineering',       path: '/services#agentic-ai' },
  { label: 'Data Engineering & Platforms', path: '/services#data-engineering' },
  { label: 'Data Science & Analytics',     path: '/services#data-science' },
  { label: 'Cloud Architecture',           path: '/services#cloud-architecture' },
  { label: 'MLOps & DataOps',              path: '/services#mlops' },
  { label: 'Enterprise Software Eng.',     path: '/services#software-engineering' },
  { label: 'FinTech & Blockchain',         path: '/services#fintech-blockchain' },
]

const COMPANY_LINKS = [
  { label: 'About Us',          path: '/about' },
  { label: 'Case Studies',      path: '/case-studies' },
  { label: 'Blog & Insights',   path: '/insights' },
  //{ label: 'RhemaAI Academy',      path: 'https://rhemaai.academy', external: true },
  { label: 'RhemaAI Platform',     path: '/services' },
  { label: 'RhemaAI Press',        path: '/insights' },
  { label: 'RhemaAI Labs',         path: '/labs' },
  { label: 'RhemaAI Careers',      path: '/careers' },
]

const CONTACT_LINKS = [
  { label: 'info@rhemaai.tech',    path: 'mailto:info@rhemaai.tech', external: true },
  { label: '+234 904 313 8981',    path: 'tel:+2349043138981', external: true },
  { label: 'LinkedIn',             path: 'https://linkedin.com/company/rhemaai-tech', external: true },
  { label: 'GitHub',               path: 'https://github.com/phunkie24', external: true },
  { label: 'YouTube',              path: 'https://www.youtube.com/@Funtech-ai-x4t', external: true },
  { label: 'Book a Discovery Call',path: '/contact' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      await newsletterAPI.subscribe(email)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <div className={styles.logoMark}>
              <BrandMark className={styles.logoSvg} title="RhemaAI Solutions Ltd logo" />
            </div>
            <span className={styles.brandName}>
              Rhema<span>AI</span> Solutions Ltd
            </span>
          </div>
          <p className={styles.tagline}>
            Enterprise AI transformation, cloud-native data platforms, advanced analytics,
            and agentic intelligence systems built for global scale.
          </p>

          {/* Newsletter */}
          <div className={styles.newsletter} id="newsletter">
            <div className={styles.newsletterTitle}>Intelligence Insights</div>
            <div className={styles.newsletterSub}>AI, cloud & data engineering updates. No spam.</div>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.subscribeBtn} disabled={status === 'loading'}>
                {status === 'loading' ? '...' : '->'}
              </button>
            </form>
            {status === 'success' && <p className={styles.successMsg}>Subscribed. You are on the list.</p>}
            {status === 'error'   && <p className={styles.errorMsg}>Something went wrong. Try again.</p>}
          </div>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Services</div>
          <ul>
            {SERVICES_LINKS.map((l) => (
              <li key={`${l.label}-${l.path}`}>
                <Link to={l.path} className={styles.footerLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Company</div>
          <ul>
            {COMPANY_LINKS.map((l) => (
              <li key={`${l.label}-${l.path}`}>
                {l.external
                  ? <a href={l.path} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{l.label}</a>
                  : <Link to={l.path} className={styles.footerLink}>{l.label}</Link>
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Connect</div>
          <ul>
            {CONTACT_LINKS.map((l) => (
              <li key={`${l.label}-${l.path}`}>
                {l.external
                  ? <a href={l.path} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{l.label}</a>
                  : <Link to={l.path} className={styles.footerLink}>{l.label}</Link>
                }
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} <span>RhemaAI Solutions Ltd</span>. All rights reserved.
        </div>
        <div className={styles.legal}>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}
