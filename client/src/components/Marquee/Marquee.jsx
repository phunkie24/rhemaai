import styles from './Marquee.module.css'

const ITEMS = [
  'Microsoft Azure', 'Amazon Web Services', 'Google Cloud Platform',
  'Databricks', 'Apache Spark', 'Agentic AI', 'LLM Engineering',
  'Kubernetes', 'RAG Systems', 'MLOps', 'Data Lakehouse',
  'Advanced Analytics', 'Predictive Modelling', 'Data Engineering',
  'Python', 'C# .NET Core', 'FastAPI', 'MERN Stack', 'Solidity',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className={styles.marqueeSection}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
