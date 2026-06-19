import PageSEO from '@components/common/PageSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './AboutPage.module.css'
import founderPhoto from '../assets/funke-yusuf.webp'

const PILLARS = [
  {
    symbol: 'M',
    title: 'Applied Mathematics',
    desc: 'Analytical depth for enterprise AI, forecasting, optimisation, and decision systems. Statistical rigour is built into every architecture from day one.',
  },
  {
    symbol: 'C',
    title: 'Azure, AWS and GCP Certified',
    desc: 'Certified delivery across the major cloud platforms. We design resilient multi-cloud architectures without vendor lock-in or platform bias.',
  },
  {
    symbol: 'A',
    title: 'Agentic AI Pioneer',
    desc: '10,000+ agentic AI implementations. LLM orchestration, multi-agent pipelines, and RAG architectures deployed in real enterprises.',
  },
  {
    symbol: 'D',
    title: 'Full Data Value Chain',
    desc: 'From ERP ingestion to Bronze-Silver-Gold Lakehouse to predictive models and BI dashboards, we own the complete journey.',
  },
]

const STATS = [
  { value: 'Azure, AWS and GCP', label: 'Certified Cloud Delivery' },
  { value: '10,000+', label: 'Agentic AI Patterns' },
  { value: '50+', label: 'Enterprise Projects' },
  { value: '3',   label: 'Cloud Platforms' },
]

const VALUES = [
  {
    symbol: 'Q',
    title: 'Enterprise-Grade Delivery',
    desc: 'Production-grade work with clear governance, security, documentation, and operational ownership.',
  },
  {
    symbol: 'F',
    title: 'First Principles Thinking',
    desc: 'Applied Mathematics means we reason from the ground up. We know why the architecture works before it reaches production.',
  },
  {
    symbol: 'T',
    title: 'Senior-Led Execution',
    desc: 'Every engagement is led by experienced practitioners who can move from architecture to implementation.',
  },
  {
    symbol: 'G',
    title: 'Global Perspective',
    desc: 'International enterprise clients with deep domain expertise in emerging market contexts.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageSEO
        title="About RhemaAI Solutions Ltd | Enterprise AI & Data Engineering Firm Nigeria"
        description="RhemaAI Solutions Ltd is a Nigeria-based enterprise AI and data engineering consultancy led by Funke Yusuf. Azure, AWS and GCP certified. 10,000+ agentic AI implementations across fintech, energy, healthcare and manufacturing globally."
        keywords="RhemaAI Solutions Nigeria, AI consulting firm Africa, data engineering company Nigeria, Funke Yusuf AI expert, enterprise AI consulting Lagos, agentic AI pioneer, Azure certified consultant"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Funke Yusuf',
          jobTitle: 'Founder & Chief AI Engineer',
          worksFor: { '@type': 'Organization', name: 'RhemaAI Solutions Ltd', url: 'https://rhemaaisolutions.tech' },
          url: 'https://rhemaaisolutions.tech/about',
          knowsAbout: ['Agentic AI', 'Data Engineering', 'Machine Learning', 'Azure Cloud', 'Data Science', 'Business Intelligence', 'MLOps'],
        }}
      />

      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className="container">
          <motion.div
            className={styles.heroInner}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badge}>About Us</span>
            <h1 className={styles.heroTitle}>
              Where Applied Mathematics<br />
              <span className={styles.heroAccent}>Meets Enterprise AI</span>
            </h1>
            <p className={styles.heroSub}>
              Built on one belief: the most powerful enterprise AI and cloud solutions
              come from combining deep mathematical rigour, multi-cloud mastery, and real
              production experience into systems executives can trust.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.pillarsGrid}>
            {PILLARS.map((p) => (
              <div key={p.title} className={styles.pillar}>
                <div className={styles.pillarIcon}>{p.symbol}</div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.statsStrip}>
        <div className={styles.statsInner} />
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div
                key={s.label}
                className={styles.stat}
              >
                <strong className={styles.statValue}>{s.value}</strong>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.founderSection}>
        <div className="container">
          <div className={styles.founderInner}>
            <div className={styles.founderPhotoWrap}>
              <img src={founderPhoto} alt="Funke Yusuf" className={styles.founderPhoto} loading="lazy" decoding="async" />
              <div className={styles.founderPhotoBorder} />
            </div>
            <div className={styles.founderCopy}>
              <span className={styles.sectionLabel}>Leadership</span>
              <h2 className={styles.founderName}>Funke Yusuf</h2>
              <p className={styles.founderRole}>Data &amp; AI Architect &nbsp;·&nbsp; Enterprise AI Consultant &nbsp;·&nbsp; Founder, RhemaAI</p>
              <div className={styles.founderDivider} />
              <p className={styles.founderBio}>
                Funke founded RhemaAI Solutions Ltd to bring rigorous, mathematics-backed AI and data engineering
                to enterprise organisations across Africa, Europe, and beyond. With certifications across Azure,
                AWS, and GCP, and hands-on delivery of 10,000+ agentic AI patterns, she leads every engagement
                from architecture through to production.
              </p>
              <div className={styles.founderTags}>
                <span>Applied Mathematics</span>
                <span>Agentic AI</span>
                <span>Data Lakehouse</span>
                <span>Cloud Architecture</span>
                <span>MLOps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className={styles.sectionLabel}>Our Values</span>
            <h2 className={styles.sectionTitle}>What We Stand For</h2>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.symbol}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Work With Us</h2>
            <p className={styles.ctaDesc}>
              Ready to bring this expertise to your enterprise?
              Let's start with a discovery call.
            </p>
            <Link to="/contact" className={styles.ctaBtn}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
