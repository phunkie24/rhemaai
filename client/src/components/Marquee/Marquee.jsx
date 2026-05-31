import styles from './Marquee.module.css'

const ITEMS = [
  'Microsoft Azure', 'Amazon Web Services', 'Google Cloud Platform',
  'Databricks', 'Apache Spark', 'Agentic AI', 'LLM Engineering',
  'Kubernetes', 'RAG Systems', 'MLOps', 'Data Lakehouse',
  'Advanced Analytics', 'Predictive Modelling', 'Data Engineering',
  'Python', 'C# .NET Core', 'FastAPI', 'MERN Stack', 'Solidity',
]

export default function Marquee() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.streamLine} />
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />
      <div className={styles.track}>
        {/* Tripled so the loop is truly seamless at any viewport width */}
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
