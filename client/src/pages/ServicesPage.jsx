import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import { SERVICES } from '@utils/servicesData'
import styles from './ServicesPage.module.css'

function ServiceDetail({ service, index }) {
  const { ref, inView } = useInView()
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      id={service.id}
      className={`${styles.serviceBlock} ${!isEven ? styles.serviceBlockAlt : ''}`}
    >
      <motion.div
        className={styles.serviceBlockInner}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className={styles.serviceHeader}>
          <div className={styles.serviceIcon}>{service.icon}</div>
          <div>
            <h2 className={styles.serviceTitle}>{service.title}</h2>
            <p className={styles.serviceDesc}>{service.description}</p>
          </div>
        </div>

        {/* Capabilities + Tags */}
        <div className={styles.serviceBody}>
          <div className={styles.capCol}>
            <div className={styles.capColTitle}>What We Deliver</div>
            <ul className={styles.capList}>
              {service.capabilities.map((cap) => (
                <li key={cap} className={styles.capItem}>
                  <span className={styles.capCheck}>✓</span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.tagCol}>
            <div className={styles.capColTitle}>Technologies</div>
            <div className={styles.tagWrap}>
              {service.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <Link to="/contact" className={styles.enquireBtn}>
              Enquire About This Service →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — RhemaAI Technologies | AI, Cloud & Data Engineering</title>
        <meta
          name="description"
          content="Explore RhemaAI Technologies' full service portfolio: Agentic AI, Data Engineering, Data Science & Advanced Analytics, Cloud Architecture, MLOps, Enterprise Software Engineering, and FinTech."
        />
      </Helmet>

      {/* Page Hero */}
      <div className={styles.pageHero}>
        <motion.div
          className={styles.pageHeroContent}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.heroLabel}>Our Services</span>
          <h1 className={styles.heroTitle}>
            Enterprise AI & Cloud<br />
            <span className={styles.heroAccent}>Service Portfolio</span>
          </h1>
          <p className={styles.heroDesc}>
            Seven interconnected service lines spanning the full AI, data, and cloud technology stack —
            designed to deliver measurable enterprise transformation from strategy through production.
          </p>
          {/* Quick nav */}
          <div className={styles.quickNav}>
            {SERVICES.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={styles.quickNavItem}>
                <span>{s.icon}</span>
                <span className={styles.quickNavLabel}>{s.title.split(' ')[0]}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Services detail list */}
      <div className={styles.servicesList}>
        {SERVICES.map((service, i) => (
          <ServiceDetail key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className={styles.bottomCTA}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.ctaTitle}>Ready to Start Your Transformation?</h2>
          <p className={styles.ctaDesc}>
            Not sure which service fits your needs? Book a free discovery call —
            we'll map the right solution to your specific challenges.
          </p>
          <Link to="/contact" className={styles.ctaBtn}>
            Book a Free Consultation →
          </Link>
        </motion.div>
      </div>
    </>
  )
}
