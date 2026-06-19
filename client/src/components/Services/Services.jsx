import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICES } from '@utils/servicesData'
import SectionHeader from '@components/common/SectionHeader'
import styles from './Services.module.css'

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`${styles.card} ${service.highlight ? styles.cardHighlight : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {service.highlight && (
        <div className={styles.popularBadge}>Featured</div>
      )}

      <div className={`${styles.icon} ${hovered ? styles.iconActive : ''}`}>
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
        Learn more
      </Link>
    </motion.div>
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
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className={styles.cta}>
        <Link to="/services" className={styles.allServicesBtn}>
          View All Services & Capabilities
        </Link>
      </div>
    </section>
  )
}
