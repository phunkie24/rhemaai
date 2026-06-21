import { useState } from 'react'
import SectionHeader from '@components/common/SectionHeader'
import apaieMedia from '../../assets/case-studies/apaie-agent-designs-diagram.webp'
import procureiqMedia from '../../assets/case-studies/procureiq-agents-diagram.webp'
import seplatMedia from '../../assets/case-studies/seplat-edw-diagram.webp'
import styles from './Industries.module.css'

const INDUSTRIES = [
  { icon: 'OG', label: 'Oil & Gas',                 highlight: true },
  { icon: 'FS', label: 'Financial Services',         highlight: false },
  { icon: 'HC', label: 'Healthcare & Life Sciences', highlight: false },
  { icon: 'MF', label: 'Manufacturing',              highlight: false },
  { icon: 'TC', label: 'Telecommunications',         highlight: false },
  { icon: 'GV', label: 'Government & Public Sector', highlight: false },
  { icon: 'RT', label: 'Retail & E-Commerce',        highlight: false },
  { icon: 'SC', label: 'Logistics & Supply Chain',   highlight: false },
  { icon: 'EN', label: 'Energy & Utilities',         highlight: true },
  { icon: 'ED', label: 'Education & EdTech',         highlight: false },
  { icon: 'IN', label: 'Insurance & InsurTech',      highlight: false },
  { icon: 'RE', label: 'Real Estate & PropTech',     highlight: false },
  { icon: 'AG', label: 'Agriculture & AgriTech',     highlight: false },
  { icon: 'AV', label: 'Aviation & Transport',       highlight: false },
  { icon: 'TS', label: 'Technology & SaaS',          highlight: true },
]

const CASE_STUDIES = [
  {
    tag: 'Oil & Gas',
    title: 'Seplat Energy Enterprise Data Warehouse',
    desc: 'SAP ECC to ADLS Gen2 to Databricks Bronze-Silver-Gold pipeline covering EAM, SRM, and SunSystems. Full medallion architecture with Azure Synapse Analytics.',
    tech: ['Databricks', 'Azure Synapse', 'SAP ECC', 'PySpark', 'ADLS Gen2'],
    metrics: '100+ tables mapped',
    image: seplatMedia,
  },
  {
    tag: 'Enterprise AI',
    title: 'ProcureIQ Multi-Agent Procurement System',
    desc: '5-agent AI system with Sourcing Intelligence, Bid Evaluation, PO Execution, Contract Intelligence, and Vendor Management agents. Full Nigerian Content compliance.',
    tech: ['Python Agents', 'FastAPI', 'Azure Gold Layer', 'Claude AI', 'MERN'],
    metrics: '5 specialist agents',
    image: procureiqMedia,
  },
  {
    tag: 'Agentic AI',
    title: 'APAIE Autonomous Procurement & Asset Intelligence',
    desc: '378 agent designs across 5 operational clusters for oil and gas enterprise clients. Full MAS architecture with agentic design patterns.',
    tech: ['Multi-Agent Systems', 'ADAS Patterns', 'C# .NET', 'Azure', 'LLM'],
    metrics: '378 agent designs',
    image: apaieMedia,
  },
]

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState(null)

  return (
    <section className={styles.section}>
      <SectionHeader
        label="Industries Served"
        title="Built for Every Sector That Runs on Data"
        subtitle="Deep domain expertise meets advanced AI and cloud engineering across the industries that matter most."
      />

      <div className={styles.pillGrid}>
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.label}
            type="button"
            className={`${styles.pill} ${ind.highlight ? styles.pillHighlight : ''} ${activeIndustry === ind.label ? styles.pillActive : ''}`}
            onClick={() => setActiveIndustry(activeIndustry === ind.label ? null : ind.label)}
            aria-pressed={activeIndustry === ind.label}
          >
            <span className={styles.pillIcon} aria-hidden="true">{ind.icon}</span>
            {ind.label}
          </button>
        ))}
      </div>

      <div className={styles.caseStudiesSection}>
        <span className={styles.csLabel}>Selected Case Studies</span>
        <div className={styles.caseGrid}>
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.title}
              className={styles.caseCard}
            >
              <div className={styles.caseMedia} aria-hidden="true">
                <img src={cs.image} alt="" loading="lazy" decoding="async" />
                <span>{cs.metrics}</span>
              </div>
              <div className={styles.caseTag}>{cs.tag}</div>
              <h3 className={styles.caseTitle}>{cs.title}</h3>
              <p className={styles.caseDesc}>{cs.desc}</p>
              <div className={styles.caseTech}>
                {cs.tech.map((t) => (
                  <span key={t} className={styles.caseTechItem}>{t}</span>
                ))}
              </div>
              <div className={styles.caseMetric}>
                <span className={styles.metricDot} />
                {cs.metrics}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
