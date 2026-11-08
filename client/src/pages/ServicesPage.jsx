import { motion, useReducedMotion } from 'framer-motion'
import PageSEO from '@components/common/PageSEO'
import { Link } from 'react-router-dom'
import { SERVICES } from '@utils/servicesData'
import CTA from '@components/CTA/CTA'
import styles from './ServicesPage.module.css'

const PROOF_POINTS = [
  'Azure, AWS and GCP Certified',
  'Applied Mathematics',
  'Production MLOps',
]

const STREAM_EVENTS = [
  { label: 'Enterprise systems and data', value: 'Connect' },
  { label: 'Quality and evaluation', value: 'Validate' },
  { label: 'Models and applications', value: 'Deploy' },
  { label: 'Monitoring and governance', value: 'Operate' },
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
  const reduceMotion = useReducedMotion()
  return (
    <>
      <PageSEO
        title="AI, Data Engineering & Cloud Services | RhemaAI Solutions Ltd"
        description="End-to-end enterprise services: agentic AI systems, data engineering pipelines, Azure cloud architecture, MLOps, machine learning, BI analytics and data science — delivered globally from Nigeria to UK, US, UAE, South Africa and beyond."
        keywords="AI consulting services Nigeria, data engineering services, Azure cloud consulting UK, agentic AI engineering, MLOps DataOps, machine learning services UAE, BI analytics consulting, data science South Africa"
      />

      <section className={`brand-header ${styles.hero}`}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className="container">
          <div
            className={styles.heroInner}



          >
            <div className={styles.heroCopy}>
              <span className={styles.badge}>Enterprise Service Portfolio</span>
              <h1 className={styles.heroTitle}>
                AI, Data and Cloud Services<br />
                <span className={styles.heroAccent}>Built for Production</span>
              </h1>
              <p className={styles.heroSub}>
                Explore our service highlights. Open any service for its full capabilities,
                technologies and engagement options.
              </p>
              <div className={styles.heroActions}>
                <Link to="#capabilities" className={styles.primaryAction}>Explore services <span aria-hidden="true">↗</span></Link>
                <Link to="/contact" className={styles.secondaryAction}>Discuss your project</Link>
              </div>
              <div className={styles.proofRow}>
                {PROOF_POINTS.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </div>

            <div
              className={styles.streamPanel}



              aria-label="Illustrative service delivery workflow"
            >
              <div className={styles.panelTop}>
                <div>
                  <span className={styles.panelKicker}>Delivery in motion</span>
                  <strong>From systems to intelligence</strong>
                </div>
                <span className={styles.livePill}>Connected</span>
              </div>

              <div className={styles.streamMap}>
                <span>Systems</span>
                <div className={styles.streamRail}>
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                </div>
                <span>AI Services</span>
              </div>

              <div className={styles.eventList}>
                {STREAM_EVENTS.map((event, index) => (
                  <div
                    key={event.label}
                    className={styles.eventRow}
                    style={{ '--event-delay': `${index * 0.7}s` }}
                  >
                    <span>{event.label}</span>
                    <strong>{event.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
              <motion.div
                key={stage.title}
                className={styles.flowStage}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className={styles.stageNum}>0{index + 1}</span>
                <h3>{stage.title}</h3>
                <p>{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gridSection} id="capabilities">
        <div className="container">
          <div className={styles.serviceHeader}>
            <span className={styles.sectionLabel}>Service highlights</span>
            <h2>Specialised Services, Integrated Delivery</h2>
            <p>
              Find your next capability. Explore each service for the full scope and pricing.
            </p>
          </div>

          <div className={styles.grid}>
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.id}
                id={service.id}
                className={`${styles.card} ${service.highlight ? styles.cardFeatured : ''}`}
                style={{ '--service-color': service.color, '--shine-delay': `${(index % 6) * 0.8}s` }}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
              >
                {service.highlight && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}

                <div className={styles.cardIcon} aria-hidden="true">
                  {service.icon}
                </div>

                <h3 className={styles.cardTitle}>
                  <Link to={`/services/${service.id}`}>{service.title}</Link>
                </h3>

                <ul className={styles.caps}>
                  {service.capabilities.slice(0, 2).map((cap) => (
                    <li key={cap} className={styles.cap}>
                      <span className={styles.capDot} />
                      {cap.split(': ')[0]}
                    </li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {service.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <Link
                  to={`/services/${service.id}`}
                  className={styles.cardLink}
                  aria-label={`Explore service: ${service.title}`}
                >
                  Explore service
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
