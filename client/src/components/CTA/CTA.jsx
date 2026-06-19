import { Link } from 'react-router-dom'
import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />

      <div className={styles.content}>
        <span className={styles.label}>Ready for Production AI?</span>
        <h2 className={styles.title}>
          Build the Next Layer of<br />Enterprise Intelligence
        </h2>
        <p className={styles.desc}>
          Let's define the roadmap, architecture and delivery model for intelligent
          systems that can operate securely at enterprise scale.
        </p>
        <div className={styles.actions}>
          <Link to="/contact" className={styles.btnWhite}>
            Book a Free Consultation
          </Link>
          <Link to="/services#capabilities" className={styles.btnGhost}>
            Explore Services
          </Link>
        </div>

        <div className={styles.trustRow}>
          {['Azure, AWS and GCP Certified', 'Applied Mathematics', 'Enterprise-proven', 'Production-grade AI'].map((t) => (
            <div key={t} className={styles.trustItem}>
              <span className={styles.trustCheck}>+</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
