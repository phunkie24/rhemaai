import { useState } from 'react'
import { Link } from 'react-router-dom'
import { newsletterAPI } from '@utils/api'
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
  { label: 'About Us',         path: '/about' },
  { label: 'Case Studies',     path: '/#case-studies' },
  { label: 'Blog & Insights',  path: '/insights' },
  { label: 'EliteAI Academy',  path: 'https://eliteaiacademy.com', external: true },
  { label: 'Careers',          path: '/careers' },
]

const CONTACT_LINKS = [
  { label: 'hello@rhemaai.tech',   path: 'mailto:hello@rhemaai.tech', external: true },
  { label: 'LinkedIn',             path: 'https://linkedin.com/company/rhemaai', external: true },
  { label: 'GitHub',               path: 'https://github.com/rhemaai', external: true },
  { label: 'YouTube',              path: 'https://youtube.com/@rhemaai', external: true },
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
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span className={styles.brandName}>
              Rhema<span>AI</span> Technologies
            </span>
          </div>
          <p className={styles.tagline}>
            Enterprise AI transformation, cloud-native data platforms, advanced analytics,
            and agentic intelligence systems — built for global scale.
          </p>

          {/* Newsletter */}
          <div className={styles.newsletter}>
            <div className={styles.newsletterTitle}>Intelligence Insights</div>
            <div className={styles.newsletterSub}>AI, cloud & data engineering updates — no spam.</div>
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
                {status === 'loading' ? '...' : '→'}
              </button>
            </form>
            {status === 'success' && <p className={styles.successMsg}>✓ You're subscribed!</p>}
            {status === 'error'   && <p className={styles.errorMsg}>Something went wrong. Try again.</p>}
          </div>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Services</div>
          <ul>
            {SERVICES_LINKS.map((l) => (
              <li key={l.path}>
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
              <li key={l.path}>
                {l.external
                  ? <a href={l.path} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{l.label} ↗</a>
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
              <li key={l.path}>
                {l.external
                  ? <a href={l.path} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{l.label}</a>
                  : <Link to={l.path} className={styles.footerLink}>{l.label}</Link>
                }
              </li>
            ))}
          </ul>

          <div className={styles.certBadges}>
            <div className={styles.certBadge}>19× Azure</div>
            <div className={styles.certBadge}>AWS</div>
            <div className={styles.certBadge}>GCP</div>
            <div className={styles.certBadge}>MSc Maths</div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>
          © {new Date().getFullYear()} <span>RhemaAI Technologies</span>. All rights reserved.
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
