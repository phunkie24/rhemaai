import { Link } from 'react-router-dom'
import { SERVICES } from '@utils/servicesData'
import SectionHeader from '@components/common/SectionHeader'
import advisoryMedia from '../../assets/services/ai-advisory-governance-diagram.webp'
import agenticMedia from '../../assets/services/agentic-ai-diagram.webp'
import cloudMedia from '../../assets/services/cloud-architecture-diagram.webp'
import dataEngineeringMedia from '../../assets/services/data-engineering-diagram.webp'
import dataScienceMedia from '../../assets/services/data-science-diagram.webp'
import softwareMedia from '../../assets/services/enterprise-software-diagram.webp'
import fintechMedia from '../../assets/services/fintech-blockchain-diagram.webp'
import generativeMedia from '../../assets/services/generative-ai-diagram.webp'
import mlopsMedia from '../../assets/services/mlops-dataops-diagram.webp'
import styles from './Services.module.css'

const SERVICE_VISUALS = {
  'agentic-ai': agenticMedia,
  'generative-ai': generativeMedia,
  'data-engineering': dataEngineeringMedia,
  'data-science': dataScienceMedia,
  'cloud-architecture': cloudMedia,
  mlops: mlopsMedia,
  'ai-advisory': advisoryMedia,
  'software-engineering': softwareMedia,
  'fintech-blockchain': fintechMedia,
}

function ServiceCard({ service }) {
  return (
    <div
      className={`${styles.card} ${service.highlight ? styles.cardHighlight : ''}`}
      style={{ '--service-color': service.color }}
    >
      {service.highlight && (
        <div className={styles.popularBadge}>Featured</div>
      )}

      <div className={styles.cardMedia} aria-hidden="true">
        <img src={SERVICE_VISUALS[service.id]} alt="" loading="lazy" decoding="async" />
        <span>{service.icon}</span>
      </div>

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

      <Link to={`/services#${service.id}`} className={styles.cardLink} aria-label={`Learn more about ${service.title}`}>
        Learn more
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
