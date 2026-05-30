import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import styles from './AboutPage.module.css'

const TIMELINE = [
  { year: '2018', event: 'BSc Mathematics — Foundation in analytical and computational thinking' },
  { year: '2020', event: 'MSc Applied Mathematics — Advanced statistical modelling and optimisation' },
  { year: '2021', event: 'First Microsoft Azure certifications — began cloud architecture practice' },
  { year: '2022', event: 'Enterprise data engineering — first large-scale Databricks/Synapse deployments' },
  { year: '2023', event: 'Agentic AI specialisation — built first multi-agent enterprise systems' },
  { year: '2024', event: 'Founded RhemaAI Technologies — combining all disciplines under one brand' },
  { year: '2025', event: 'Expanded to international enterprise clients — 19+ Azure certs, AWS, GCP' },
  { year: '2026', event: 'Launched EliteAI Academy — teaching agentic AI, cloud, and data engineering' },
]

const AZURE_CERTS = [
  'AZ-900: Azure Fundamentals',
  'AZ-104: Azure Administrator',
  'AZ-204: Azure Developer',
  'AZ-305: Azure Solutions Architect Expert',
  'AZ-400: DevOps Engineer Expert',
  'AZ-500: Security Engineer',
  'AZ-700: Network Engineer',
  'AZ-800 / AZ-801: Windows Server Hybrid',
  'AI-900: AI Fundamentals',
  'AI-102: AI Engineer',
  'DP-900: Data Fundamentals',
  'DP-100: Data Scientist',
  'DP-203: Data Engineer',
  'DP-300: Database Administrator',
  'DP-600: Fabric Analytics Engineer',
  'PL-900: Power Platform Fundamentals',
  'PL-400: Power Platform Developer',
  'SC-900: Security Fundamentals',
  'MS-900: Microsoft 365 Fundamentals',
]

const VALUES = [
  {
    icon: '🎯',
    title: 'Elite Output Only',
    desc: 'We ship production-grade work. No half-measures, no scope creep, no placeholder deliverables. Every artefact is enterprise-ready.',
  },
  {
    icon: '🧮',
    title: 'First Principles Thinking',
    desc: 'Our mathematics foundation means we reason from the ground up. We understand why the architecture works, not just that it works.',
  },
  {
    icon: '⚡',
    title: 'Thin Team, Maximum Value',
    desc: 'No bloated delivery bench. You work directly with senior experts. Every engagement maximises value-to-overhead ratio.',
  },
  {
    icon: '🌍',
    title: 'Global Perspective, Local Depth',
    desc: 'Serving international enterprise clients while maintaining deep domain expertise in emerging market contexts — particularly oil & gas in West Africa.',
  },
]

export default function AboutPage() {
  const { ref: timelineRef, inView: timelineInView } = useInView()
  const { ref: valuesRef, inView: valuesInView } = useInView()

  return (
    <>
      <Helmet>
        <title>About RhemaAI Technologies | Enterprise AI & Cloud Consulting</title>
        <meta
          name="description"
          content="RhemaAI Technologies was founded on the rare combination of MSc Applied Mathematics, 19+ Azure certifications, multi-cloud expertise, and agentic AI engineering. Learn our story."
        />
      </Helmet>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.heroLabel}>About Us</span>
          <h1 className={styles.heroTitle}>
            Where Mathematics Meets<br />
            <span className={styles.heroAccent}>Enterprise AI</span>
          </h1>
          <p className={styles.heroDesc}>
            RhemaAI Technologies was built on one core belief: that the most powerful enterprise AI
            and cloud solutions come from combining deep mathematical rigour, multi-cloud mastery,
            and real production experience — not just certifications on paper.
          </p>
        </motion.div>
      </div>

      {/* Positioning */}
      <section className={styles.positioningSection}>
        <div className={styles.positioningGrid}>
          <motion.div
            className={styles.positionCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className={styles.posIcon}>∑</div>
            <h3>MSc Applied Mathematics</h3>
            <p>Our analytical foundation lets us solve AI and data problems from first principles — not templates. Statistical rigour built in from the start.</p>
          </motion.div>
          <motion.div
            className={styles.positionCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            <div className={styles.posIcon}>☁️</div>
            <h3>19+ Azure Certifications</h3>
            <p>The deepest Microsoft Azure certification stack in the market — plus AWS and GCP. We architect across cloud boundaries without bias or lock-in.</p>
          </motion.div>
          <motion.div
            className={styles.positionCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            <div className={styles.posIcon}>🤖</div>
            <h3>Agentic AI Pioneer</h3>
            <p>21 agentic design patterns. Production multi-agent systems. LLM orchestration, RAG pipelines, and ADAS architectures deployed in real enterprise environments.</p>
          </motion.div>
          <motion.div
            className={styles.positionCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            <div className={styles.posIcon}>📊</div>
            <h3>Full Data Value Chain</h3>
            <p>From SAP ECC ingestion to Bronze-Silver-Gold Databricks pipelines to predictive models and BI dashboards — we own the complete data transformation journey.</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesSectionInner}>
          <span className={styles.sectionLabel}>Our Values</span>
          <h2 className={styles.sectionTitle}>What We Stand For</h2>
          <motion.div
            ref={valuesRef}
            className={styles.valuesGrid}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                className={styles.valueCard}
                variants={{
                  hidden:  { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Azure Certifications */}
      <section className={styles.certsSection}>
        <div className={styles.certsSectionInner}>
          <span className={styles.sectionLabel}>Certifications</span>
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>19+ Microsoft Azure Certifications</h2>
          <p className={styles.certsDesc}>
            The broadest Azure certification stack — covering architecture, data, AI, security,
            DevOps, and development. Plus AWS and GCP certified.
          </p>
          <div className={styles.certsList}>
            {AZURE_CERTS.map((cert) => (
              <div key={cert} className={styles.certItem}>
                <span className={styles.certCheck}>✓</span>
                {cert}
              </div>
            ))}
          </div>
          <div className={styles.otherCerts}>
            <span className={styles.otherCert}>+ AWS Solutions Architect</span>
            <span className={styles.otherCert}>+ AWS Data Engineer</span>
            <span className={styles.otherCert}>+ GCP Professional Cloud Architect</span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <span className={styles.sectionLabel}>Our Journey</span>
        <h2 className={styles.sectionTitle}>From Mathematics to Enterprise AI</h2>
        <motion.div
          ref={timelineRef}
          className={styles.timeline}
          initial="hidden"
          animate={timelineInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {TIMELINE.map((item) => (
            <motion.div
              key={item.year}
              className={styles.timelineItem}
              variants={{
                hidden:  { opacity: 0, x: -24 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className={styles.timelineYear}>{item.year}</div>
              <div className={styles.timelineDot} />
              <div className={styles.timelineEvent}>{item.event}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <div className={styles.aboutCTA}>
        <h2>Work With Us</h2>
        <p>Ready to bring this expertise to your enterprise? Let's start with a discovery call.</p>
        <Link to="/contact" className={styles.ctaBtn}>Book a Consultation →</Link>
      </div>
    </>
  )
}
