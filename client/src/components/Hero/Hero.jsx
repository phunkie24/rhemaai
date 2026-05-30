import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCountUp from '@hooks/useCountUp'
import styles from './Hero.module.css'

const STATS = [
  { value: 19, suffix: '+', label: 'Azure Certifications' },
  { value: 3,  suffix: '',  label: 'Cloud Platforms' },
  { value: 50, suffix: '+', label: 'Enterprise Projects' },
  { value: 21, suffix: '',  label: 'Agentic AI Patterns' },
]

function StatItem({ stat, delay }) {
  const count = useCountUp(stat.value, 2200, true)
  return (
    <motion.div
      className={styles.stat}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.5 }}
    >
      <div className={styles.statNum}>
        {count}{stat.suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Background layers */}
      <div className={styles.heroBg}>
        <div className={styles.heroGrid} />
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={styles.gradientBase} />
      </div>

      {/* SEO keyword bar */}
      <motion.div
        className={styles.seoBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {['Enterprise AI Consulting', 'Agentic AI Systems', 'Azure · AWS · GCP',
          'Data Engineering', 'Advanced Analytics', 'MLOps · DataOps'].map((kw) => (
          <span key={kw} className={styles.seoKw}>
            <span className={styles.seoDot} />
            {kw}
          </span>
        ))}
      </motion.div>

      {/* Hero content */}
      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className={styles.badge}>
          <span className={styles.badgeDot} />
          Enterprise AI &amp; Cloud Transformation
        </motion.div>

        <motion.h1 variants={itemVariants} className={styles.headline}>
          Intelligent Systems<br />
          for <span className={styles.gradientText}>Global Enterprise</span>
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.subtext}>
          We architect and deploy AI transformation, cloud-native data platforms,
          agentic systems, advanced analytics, and enterprise intelligence infrastructure — at scale.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.actions}>
          <Link to="/contact" className={styles.btnPrimary}>
            Start Transformation
            <span className={styles.btnArrow}>→</span>
          </Link>
          <Link to="/services" className={styles.btnOutline}>
            Explore Services
          </Link>
        </motion.div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 0.08} />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className={styles.scrollLine} />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}
