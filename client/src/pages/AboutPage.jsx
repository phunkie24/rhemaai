import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './AboutPage.module.css'

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

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | RhemaAI Solutions Ltd</title>
        <meta
          name="description"
          content="RhemaAI Solutions Ltd combines Applied Mathematics, Azure, AWS and GCP certified cloud delivery, and agentic AI engineering for enterprise-grade systems."
        />
      </Helmet>

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
          <motion.div
            className={styles.pillarsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {PILLARS.map((p) => (
              <motion.div key={p.title} className={styles.pillar} variants={fadeUp}>
                <div className={styles.pillarIcon}>{p.symbol}</div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.statsStrip}>
        <div className={styles.statsInner} />
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className={styles.stat}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <strong className={styles.statValue}>{s.value}</strong>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className={styles.sectionLabel}>Our Values</span>
            <h2 className={styles.sectionTitle}>What We Stand For</h2>
          </div>
          <motion.div
            className={styles.valuesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {VALUES.map((v) => (
              <motion.div key={v.title} className={styles.valueCard} variants={fadeUp}>
                <div className={styles.valueIcon}>{v.symbol}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className="container">
          <motion.div
            className={styles.ctaInner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>Work With Us</h2>
            <p className={styles.ctaDesc}>
              Ready to bring this expertise to your enterprise?
              Let's start with a discovery call.
            </p>
            <Link to="/contact" className={styles.ctaBtn}>
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
