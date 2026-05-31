import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import { SERVICES } from '@utils/servicesData'
import SectionHeader from '@components/common/SectionHeader'
import styles from './Services.module.css'

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`${styles.card} ${service.highlight ? styles.cardHighlight : ''}`}
      variants={cardVariants}
      custom={index}
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
  const { ref, inView } = useInView()

  return (
    <section className={styles.section} id="services">
      <SectionHeader
        label="What We Build"
        title="End-to-End Enterprise AI & Cloud Services"
        subtitle="From strategy to production deployment, we deliver across the full intelligence stack, combining Applied Mathematics, multi-cloud expertise, and proven agentic AI patterns."
        centered
      />

      <motion.div
        ref={ref}
        className={styles.grid}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </motion.div>

      <motion.div
        className={styles.cta}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link to="/services" className={styles.allServicesBtn}>
          View All Services & Capabilities
        </Link>
      </motion.div>
    </section>
  )
}
