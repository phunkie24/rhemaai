import styles from './SectionHeader.module.css'

export default function SectionHeader({ label, title, subtitle, centered = false, light = false }) {
  return (
    <div
      className={`${styles.header} ${centered ? styles.centered : ''} ${light ? styles.light : ''}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
