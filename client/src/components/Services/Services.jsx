import { Link } from 'react-router-dom'
import { SERVICES } from '@utils/servicesData'

const HOME_SERVICE_IDS = ['agentic-ai', 'data-engineering', 'data-science']
const HOME_SERVICES = SERVICES.filter(s => HOME_SERVICE_IDS.includes(s.id))
const MANAGED_SERVICES = SERVICES.find(s => s.id === 'managed-services')
import SectionHeader from '@components/common/SectionHeader'
import styles from './Services.module.css'

function ServiceCard({ service }) {
  return (
    <div
      className={`${styles.card} ${service.highlight ? styles.cardHighlight : ''}`}
      style={{ '--service-color': service.color }}
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

      <Link to={`/services#${service.id}`} className={styles.cardLink}>
        Learn more<span className="sr-only"> about {service.title}</span>
      </Link>
    </div>
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
        light
      />

      <div className={styles.grid}>
        {HOME_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {MANAGED_SERVICES && (
        <div className={styles.managedBand} style={{ '--service-color': MANAGED_SERVICES.color }}>
          <div className={styles.managedIcon} aria-hidden="true">{MANAGED_SERVICES.icon}</div>
          <div className={styles.managedCopy}>
            <h3>{MANAGED_SERVICES.title}</h3>
            <p>{MANAGED_SERVICES.description}</p>
            {MANAGED_SERVICES.note && <p className={styles.managedNote}>{MANAGED_SERVICES.note}</p>}
          </div>
          <Link to="/services" className={styles.managedLink}>
            Learn more<span className="sr-only"> about {MANAGED_SERVICES.title}</span>
          </Link>
        </div>
      )}

      <div className={styles.cta}>
        <Link to="/services" className={styles.allServicesBtn}>
          View All Services & Capabilities
        </Link>
      </div>
    </section>
  )
}
