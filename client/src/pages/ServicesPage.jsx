import PageSEO from '@components/common/PageSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICES } from '@utils/servicesData'
import CTA from '@components/CTA/CTA'
import styles from './ServicesPage.module.css'

const PROOF_POINTS = [
  'Azure, AWS and GCP Certified',
  'Applied Mathematics',
  'Production MLOps',
]

const STREAM_EVENTS = [
  { label: 'ERP, SaaS and API events', value: '24.8k/min' },
  { label: 'Quality rules evaluated', value: '99.7%' },
  { label: 'Model scoring latency', value: '128ms' },
  { label: 'Governance controls active', value: '42' },
]

const FLOW_STAGES = [
  {
    title: 'Ingest',
    desc: 'Batch, API, CDC, and streaming sources enter a governed data plane.',
  },
  {
    title: 'Engineer',
    desc: 'Lakehouse, feature, and workflow layers transform raw events into trusted assets.',
  },
  {
    title: 'Intelligence',
    desc: 'Agentic AI, analytics, and ML services turn data into automated decisions.',
  },
  {
    title: 'Operate',
    desc: 'Monitoring, security, FinOps, and model governance keep systems reliable.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageSEO
        title="AI, Data Engineering & Cloud Services | RhemaAI Solutions Ltd"
        description="End-to-end enterprise services: agentic AI systems, data engineering pipelines, Azure cloud architecture, MLOps, machine learning, BI analytics and data science — delivered globally from Nigeria to UK, US, UAE, South Africa and beyond."
        keywords="AI consulting services Nigeria, data engineering services, Azure cloud consulting UK, agentic AI engineering, MLOps DataOps, machine learning services UAE, BI analytics consulting, data science South Africa"
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
            <div className={styles.heroCopy}>
              <span className={styles.badge}>Enterprise Service Portfolio</span>
              <h1 className={styles.heroTitle}>
                AI, Data and Cloud Services<br />
                <span className={styles.heroAccent}>Built for Production</span>
              </h1>
              <p className={styles.heroSub}>
                RhemaAI Solutions Ltd turns strategy into governed platforms: agentic workflows,
                streaming data foundations, cloud architecture, MLOps, and software
                systems engineered for enterprise reliability.
              </p>
              <div className={styles.proofRow}>
                {PROOF_POINTS.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </div>

            <motion.div
              className={styles.streamPanel}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Live enterprise service stream"
            >
              <div className={styles.panelTop}>
                <div>
                  <span className={styles.panelKicker}>Streaming Operations</span>
                  <strong>Enterprise intelligence fabric</strong>
                </div>
                <span className={styles.livePill}>Live</span>
              </div>

              <div className={styles.streamMap}>
                <span>Systems</span>
                <div className={styles.streamRail}>
                  <i />
                  <i />
                  <i />
                </div>
                <span>AI Services</span>
              </div>

              <div className={styles.eventList}>
                {STREAM_EVENTS.map((event, index) => (
                  <motion.div
                    key={event.label}
                    className={styles.eventRow}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.32 + index * 0.08, duration: 0.4 }}
                  >
                    <span>{event.label}</span>
                    <strong>{event.value}</strong>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.flowSection}>
        <div className="container">
          <div className={styles.flowHeader}>
            <span className={styles.sectionLabel}>Delivery Architecture</span>
            <h2>One Operating Model for AI, Data and Cloud</h2>
            <p>
              Services are designed as connected production capabilities, so every
              engagement can move from streaming ingestion to governed intelligence
              without brittle handoffs.
            </p>
          </div>

          <div className={styles.flowTrack} aria-label="Service delivery flow">
            <div className={styles.flowLine} />
            {FLOW_STAGES.map((stage, index) => (
              <div
                key={stage.title}
                className={styles.flowStage}
              >
                <span className={styles.stageNum}>0{index + 1}</span>
                <h3>{stage.title}</h3>
                <p>{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gridSection} id="capabilities">
        <div className="container">
          <div className={styles.serviceHeader}>
            <span className={styles.sectionLabel}>Capabilities</span>
            <h2>Specialised Services, Integrated Delivery</h2>
            <p>
              Choose a focused service line or combine them into a complete enterprise
              transformation roadmap.
            </p>
          </div>

          <div className={styles.grid}>
            {SERVICES.filter((service) => service.id !== 'managed-services').map((service) => (
              <div
                key={service.id}
                id={service.id}
                className={`${styles.card} ${service.highlight ? styles.cardFeatured : ''}`}
              >
                {service.highlight && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}

                <div
                  className={styles.cardIcon}
                  style={{
                    background: service.color + '1A',
                    borderColor: service.color + '40',
                  }}
                >
                  {service.icon}
                </div>

                <h2 className={styles.cardTitle}>{service.title}</h2>
                <p className={styles.cardDesc}>{service.description}</p>

                <ul className={styles.caps}>
                  {service.capabilities.slice(0, 4).map((cap) => (
                    <li key={cap} className={styles.cap}>
                      <span className={styles.capDot} style={{ background: service.color }} />
                      {cap}
                    </li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {service.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className={styles.cardLink}
                  style={{ color: service.color }}
                >
                  Start a conversation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
