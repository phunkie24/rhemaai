import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import styles from './SectionHeader.module.css'

export default function SectionHeader({ label, title, subtitle, centered = false, light = false }) {
  const { ref, inView } = useInView()

  return (
    <motion.div
      ref={ref}
      className={`${styles.header} ${centered ? styles.centered : ''} ${light ? styles.light : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  )
}
