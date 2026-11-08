import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICES } from '@utils/servicesData'

const HOME_SERVICE_IDS = ['agentic-ai', 'data-engineering', 'data-science']
const HOME_SERVICES = SERVICES.filter(s => HOME_SERVICE_IDS.includes(s.id))
const MANAGED_SERVICES = SERVICES.find(s => s.id === 'managed-services')
import SectionHeader from '@components/common/SectionHeader'
import styles from './Services.module.css'

function ServiceCard({ service, index }) {
  return (
    <motion.article
      className={`${styles.card} ${service.highlight ? styles.cardHighlight : ''}`}
      style={{ '--service-color': 'var(--gold)', '--flash-delay': `${index * 0.8}s` }}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -7 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      {service.highlight && (
        <div className={styles.popularBadge}>Featured</div>
      )}

      <div className={styles.icon}>
        <span aria-hidden="true">{service.icon}</span>
      </div>

      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.description}</p>

      <ul className={styles.capabilities}>
        {service.capabilities.slice(0, 4).map((cap) => (
          <li key={cap} className={styles.capability}>
            <span className={styles.capDot} />
            {cap}
          </li>
        ))}
      </ul>

      <div className={styles.tags}>
        {service.tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <Link to={`/services/${service.id}`} className={styles.cardLink}>
        Learn more<span className="sr-only"> about {service.title}</span>
      </Link>
    </motion.article>
  )
}

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <SectionHeader
        label="What We Build"
        title="End-to-End Enterprise AI & Cloud Services"
        subtitle="From strategy to production deployment, we deliver across the full intelligence stack, combining Applied Mathematics, multi-cloud expertise, and proven agentic AI patterns."
        centered
      />

      <div className={styles.grid}>
        {HOME_SERVICES.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {MANAGED_SERVICES && (
        <motion.article
          className={styles.managedBand}
          style={{ '--service-color': 'var(--gold)', '--flash-delay': '2.4s' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.managedIcon} aria-hidden="true">{MANAGED_SERVICES.icon}</div>
          <div className={styles.managedCopy}>
            <h3>{MANAGED_SERVICES.title}</h3>
            <p>{MANAGED_SERVICES.description}</p>
            {MANAGED_SERVICES.note && <p className={styles.managedNote}>{MANAGED_SERVICES.note}</p>}
          </div>
          <Link to="/services/managed-services" className={styles.managedLink}>
            Learn more<span className="sr-only"> about {MANAGED_SERVICES.title}</span>
          </Link>
        </motion.article>
      )}

      <div className={styles.cta}>
        <Link to="/services" className={styles.allServicesBtn}>
          View All Services & Capabilities
        </Link>
      </div>
    </section>
  )
}
