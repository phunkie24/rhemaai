import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import styles from './DataScience.module.css'

const ANALYTICS_CAPABILITIES = [
  {
    icon: 'PM',
    title: 'Predictive Modelling',
    desc: 'Machine learning models that forecast business outcomes across churn, demand, revenue, and risk.',
  },
  {
    icon: 'TS',
    title: 'Time-Series Forecasting',
    desc: 'ARIMA, Prophet, and LSTM-based forecasts for operational and financial planning.',
  },
  {
    icon: 'SA',
    title: 'Statistical Analysis',
    desc: 'Hypothesis testing, A/B experimentation, and regression analysis grounded in Applied Mathematics.',
  },
  {
    icon: 'CI',
    title: 'Customer Intelligence',
    desc: 'Segmentation, lifetime value modelling, propensity scoring, and behavioural analytics.',
  },
  {
    icon: 'PA',
    title: 'Prescriptive Analytics',
    desc: 'Optimisation algorithms and simulation models that recommend the best course of action.',
  },
  {
    icon: 'BI',
    title: 'Enterprise BI & Dashboards',
    desc: 'Power BI, Tableau, and custom analytics dashboards wired to your live data platform.',
  },
]

const TECH = [
  'Python (Pandas, NumPy, Scikit-learn)',
  'TensorFlow & PyTorch',
  'Azure Machine Learning',
  'Amazon SageMaker',
  'Databricks ML',
  'Power BI & Tableau',
  'Statistical modelling (R)',
  'MLflow experiment tracking',
]

export default function DataScience() {
  const { ref, inView } = useInView()

  return (
    <section className={styles.section} id="data-science" ref={ref}>
      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Data Science & Advanced Analytics</span>
          <h2 className={styles.title}>
            Turn Data Into<br />
            <span className={styles.accent}>Strategic Advantage</span>
          </h2>
          <p className={styles.desc}>
            Built on Applied Mathematics, our data science practice goes beyond
            dashboards. We build predictive engines, optimisation systems, and
            intelligence layers that drive measurable business outcomes.
          </p>

          <div className={styles.techStack}>
            <div className={styles.techTitle}>Technology Stack</div>
            <div className={styles.techPills}>
              {TECH.map((t) => (
                <span key={t} className={styles.techPill}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.mathBadge}>
            <div className={styles.mathIcon}>S</div>
            <div>
              <div className={styles.mathTitle}>Applied Mathematics</div>
              <div className={styles.mathSub}>First-principles statistical thinking</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.capGrid}>
            {ANALYTICS_CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                className={styles.capCard}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.45 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.capIcon}>{cap.icon}</div>
                <div className={styles.capTitle}>{cap.title}</div>
                <div className={styles.capDesc}>{cap.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
