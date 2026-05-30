import { motion } from 'framer-motion'
import { useInView } from '@hooks/useInView'
import SectionHeader from '@components/common/SectionHeader'
import styles from './Process.module.css'

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Architecture',
    desc: 'Deep technical assessment, stakeholder alignment, and solution blueprint with full data, AI, and cloud landscape mapping.',
    detail: ['Stakeholder interviews', 'Current state assessment', 'Solution architecture design', 'WBS & timeline scoping'],
  },
  {
    num: '02',
    title: 'Design & Engineering',
    desc: 'Medallion architecture design, agent system blueprints, cloud infrastructure planning, and proof of concept delivery.',
    detail: ['Data model design', 'Agent system blueprinting', 'Cloud infrastructure IaC', 'PoC & prototype delivery'],
  },
  {
    num: '03',
    title: 'Build & Integrate',
    desc: 'Production pipeline development, multi-agent deployment, cloud provisioning, testing and enterprise system integration.',
    detail: ['Pipeline development', 'Multi-agent deployment', 'System integration testing', 'Security & compliance'],
  },
  {
    num: '04',
    title: 'Operate & Scale',
    desc: 'MLOps handover, monitoring dashboards, team enablement, full documentation and continuous improvement frameworks.',
    detail: ['MLOps pipeline handover', 'Monitoring & alerting', 'Team training & knowledge transfer', 'Continuous improvement'],
  },
]

export default function Process() {
  const { ref, inView } = useInView()

  return (
    <section className={styles.section}>
      <SectionHeader
        label="Engagement Model"
        title="How We Deliver"
        subtitle="A proven 4-phase methodology that takes you from vision to production — with no ambiguity at any stage."
        light
      />

      <motion.div
        ref={ref}
        className={styles.grid}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            className={styles.step}
            variants={{
              hidden:  { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            whileHover={{ backgroundColor: 'rgba(107,70,255,0.12)', transition: { duration: 0.2 } }}
          >
            <div className={styles.stepNum}>{step.num}</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              <ul className={styles.stepDetail}>
                {step.detail.map((d) => (
                  <li key={d} className={styles.detailItem}>
                    <span className={styles.detailCheck}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            {i < STEPS.length - 1 && (
              <div className={styles.connector} aria-hidden="true">→</div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
