import { motion, useReducedMotion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import PageSEO from '@components/common/PageSEO'
import Price from '@components/common/Price'
import { SERVICES } from '@utils/servicesData'
import { SERVICE_PRICING } from '@utils/pricing'
import NotFoundPage from './NotFoundPage'
import styles from './ServicesPage.module.css'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const reduceMotion = useReducedMotion()
  const service = SERVICES.find((item) => item.id === slug)
  if (!service) return <NotFoundPage />

  const pricing = SERVICE_PRICING[service.id] || service.pricing
  return (
    <div key={service.id} style={{ '--service-color': service.color }}>
      <PageSEO
        title={`${service.title} Services | RhemaAI Solutions Ltd`}
        description={service.description}
        keywords={service.tags.join(', ')}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: `https://rhemaaisolutions.tech/services/${service.id}`,
          provider: { '@type': 'Organization', name: 'RhemaAI Solutions Ltd', url: 'https://rhemaaisolutions.tech' },
        }}
      />
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className="container">
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span>
          </nav>
          <div className={styles.heroInner}>
            <motion.div
              className={styles.heroCopy}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className={styles.badge}>Specialist enterprise services</span>
              <h1 className={styles.heroTitle}>{service.title}</h1>
              <p className={styles.heroSub}>{service.description}</p>
              <div className={styles.heroActions}>
                <Link to="/contact" className={styles.primaryAction}>Discuss this service <span aria-hidden="true">↗</span></Link>
                <Link to="#engagement" className={styles.secondaryAction}>View engagement options</Link>
              </div>
            </motion.div>
            <div className={styles.serviceVisual} aria-hidden="true">
              <div className={styles.orbit} />
              <div className={`${styles.orbit} ${styles.orbitOuter}`} />
              <div className={styles.visualCore}><span>{service.icon}</span><small>RhemaAI</small></div>
              <span className={`${styles.orbitLabel} ${styles.orbitTop}`}>Discover</span>
              <span className={`${styles.orbitLabel} ${styles.orbitRight}`}>Build</span>
              <span className={`${styles.orbitLabel} ${styles.orbitBottom}`}>Operate</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.serviceHeader}>
            <span className={styles.sectionLabel}>Full capabilities</span>
            <h2>What we can deliver</h2>
            <p>Shape the engagement around the capabilities your team needs.</p>
          </div>
          <ul className={styles.capabilityGrid}>
            {service.capabilities.map((capability, index) => (
              <motion.li
                key={capability}
                className={styles.capabilityTile}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
              >
                <span className={styles.capabilityNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <p>{capability}</p>
              </motion.li>
            ))}
          </ul>
          <div className={styles.technologyBand}>
            <h2>Technologies &amp; focus areas</h2>
            <div className={styles.tags}>{service.tags.map((tag) => <span className={styles.tag} key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      </section>

      <section className={styles.flowSection} id="engagement">
        <div className={`container ${styles.engagementGrid}`}>
          <div className={styles.serviceHeader}>
            <span className={styles.sectionLabel}>Work with us</span>
            <h2>{service.id === 'managed-services' ? 'Managed-service packages' : 'Engagement options'}</h2>
            <p>{service.note || 'Discuss your goals, current environment and delivery priorities with our team to define the right scope.'}</p>
            <Link to="/contact" className={styles.detailContact}>Request a quote <span aria-hidden="true">↗</span></Link>
            {service.id === 'agentic-ai' && <Link to="/nexus-aos" className={styles.nexusLink}>Explore Nexus AOS</Link>}
            {service.id === 'data-engineering' && <Link to="/nexus-aos/solutions/agentic-data-engineering" className={styles.nexusLink}>Explore Agentic Data Engineering</Link>}
          </div>
          <div className={styles.pricingPanel}><Price pricing={pricing} expanded /></div>
        </div>
      </section>
      <div className={`container ${styles.backLink}`}><Link to="/services#capabilities">← Explore all services</Link></div>
    </div>
  )
}
