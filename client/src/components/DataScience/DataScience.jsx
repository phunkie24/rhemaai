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
  return (
    <section className={styles.section} id="data-science">
      <div className={styles.inner}>
        <div className={styles.left}>
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
        </div>

        <div className={styles.right}>
          <div className={styles.capGrid}>
            {ANALYTICS_CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className={styles.capCard}
              >
                <div className={styles.capIcon}>{cap.icon}</div>
                <div className={styles.capTitle}>{cap.title}</div>
                <div className={styles.capDesc}>{cap.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
