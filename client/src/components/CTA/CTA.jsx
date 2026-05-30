import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import styles from './CTA.module.css'

export default function CTA() {
  const { ref, inView } = useInView()

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.bg} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.label}>Ready to Transform?</span>
        <h2 className={styles.title}>
          Start Your AI &amp;<br />Data Transformation Today
        </h2>
        <p className={styles.desc}>
          Let's architect the intelligent infrastructure that will define your enterprise's
          next decade — from agentic AI to cloud-native analytics.
        </p>
        <div className={styles.actions}>
          <Link to="/contact" className={styles.btnWhite}>
            Book a Free Consultation
          </Link>
          <Link to="/services" className={styles.btnGhost}>
            Explore Services →
          </Link>
        </div>

        <div className={styles.trustRow}>
          {['Multi-cloud certified', 'MSc Mathematics', 'Enterprise-proven', 'Production-grade AI'].map((t) => (
            <div key={t} className={styles.trustItem}>
              <span className={styles.trustCheck}>✓</span>
              {t}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
