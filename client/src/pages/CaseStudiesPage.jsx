import { useEffect, useMemo, useState } from 'react'
import PageSEO from '@components/common/PageSEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { caseStudiesAPI } from '@utils/api'
import styles from './CaseStudiesPage.module.css'

const INDUSTRY_ACCENTS = {
  Enterprise: '#5A1098',
  'Data Engineering': '#05D9E8',
  Manufacturing: '#8A0CF2',
  Energy: '#1515D8',
  Retail: '#3B9AF2',
  Healthcare: '#A5009D',
  FinTech: '#D005D0',
}

const ALL_ACCENT = '#3A3AF2'
const INDUSTRY_ORDER = Object.keys(INDUSTRY_ACCENTS)

function getIndustryAccent(industry) {
  return industry === 'All' ? ALL_ACCENT : (INDUSTRY_ACCENTS[industry] || '#9632F2')
}

function getCaseAccent(caseStudy) {
  return getIndustryAccent(caseStudy?.industry)
}

function sortIndustries(industries) {
  return [...industries].sort((a, b) => {
    const indexA = INDUSTRY_ORDER.indexOf(a)
    const indexB = INDUSTRY_ORDER.indexOf(b)
    if (indexA === -1 && indexB === -1) return a.localeCompare(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
}

function caseItem({ id, industry, client, kpi1, kpi2, summary, tags }) {
  return {
    id,
    industry,
    client,
    kpi1,
    kpi2,
    summary,
    tags,
  }
}

function caseKeys(item) {
  return [
    item._id,
    item.id,
    item.slug,
    item.client && item.industry ? `${item.industry}:${item.client}` : null,
  ].filter(Boolean)
}

function mergeCases(apiCases = []) {
  const merged = [...apiCases]
  const seen = new Set()

  apiCases.forEach((item) => {
    caseKeys(item).forEach((key) => seen.add(key))
  })

  CASES.forEach((item) => {
    if (!caseKeys(item).some((key) => seen.has(key))) {
      merged.push(item)
      caseKeys(item).forEach((key) => seen.add(key))
    }
  })

  return merged
}

const CASES = [
  caseItem({
    id: 'fraud-fintech',
    industry: 'FinTech',
    client: 'West African Digital Bank',
    kpi1: { value: '94%', label: 'Fraud Recall' },
    kpi2: { value: '<50ms', label: 'Inference Latency' },
    summary: 'Streaming fraud detection pipeline with LightGBM and Graph Neural Networks on Azure, replacing a rule-based system that missed 40% of attacks.',
    tags: ['Kafka', 'LightGBM', 'Graph ML', 'Azure', 'FastAPI'],
  }),
  caseItem({
    id: 'financial-intelligence-agent',
    industry: 'FinTech',
    client: 'Financial Intelligence Agent',
    kpi1: { value: '3-Way', label: 'Matching Automated' },
    kpi2: { value: '100%', label: 'Budget Visibility' },
    summary: 'Multi-agent financial operations system automating 3-way PO/GR/invoice matching, payment processing, budget monitoring, and rolling financial forecasting across the enterprise.',
    tags: ['LangGraph', 'FastAPI', 'Azure OpenAI', 'MCP', 'RAG'],
  }),
  caseItem({
    id: 'agentic-payment-platform',
    industry: 'FinTech',
    client: 'Agentic Payment Platform',
    kpi1: { value: '7', label: 'Specialist Agents' },
    kpi2: { value: 'On-Chain', label: 'Settlement Layer' },
    summary: 'Blockchain-backed agentic payment platform with 7 coordinated agents handling transaction routing, fraud screening, compliance checks, reconciliation, and on-chain settlement.',
    tags: ['Blockchain', 'Solidity', 'LangGraph', 'Web3', 'FastAPI'],
  }),
  caseItem({
    id: 'financial-news-intelligence-monitor',
    industry: 'FinTech',
    client: 'Financial News Intelligence Monitor',
    kpi1: { value: 'Real-Time', label: 'Signal Extraction' },
    kpi2: { value: 'NLP', label: 'Sentiment Engine' },
    summary: 'LLM-powered financial news monitoring system ingesting global feeds, extracting market signals, classifying sentiment, and delivering structured intelligence briefs to portfolio managers.',
    tags: ['GPT-4o', 'Kafka', 'NLP', 'RAG', 'Power BI'],
  }),
  caseItem({
    id: 'compliance-risk-agent',
    industry: 'FinTech',
    client: 'Compliance & Risk Agent',
    kpi1: { value: 'KYC/AML', label: 'Automated Checks' },
    kpi2: { value: 'Audit', label: 'Full Governance Trail' },
    summary: 'Autonomous compliance and risk agent performing continuous KYC/AML screening, real-time risk monitoring, regulatory breach detection, mitigation recommendations, and audit-ready governance reporting.',
    tags: ['LangGraph', 'Azure OpenAI', 'KPCC', 'Risk ML', 'ISO 27001'],
  }),
  caseItem({
    id: 'period-end-close-automation',
    industry: 'FinTech',
    client: 'Period-End Close Automation',
    kpi1: { value: 'Days to Hrs', label: 'Close Cycle Time' },
    kpi2: { value: '100%', label: 'Cost Allocation Accuracy' },
    summary: 'Agentic period-end close system automating journal entries, cost allocation, intercompany reconciliation, and project cost tracking, cutting the monthly close cycle from days to hours.',
    tags: ['LangGraph', 'SAP', 'Azure OpenAI', 'dbt', 'FastAPI'],
  }),
  caseItem({
    id: 'predictive-energy',
    industry: 'Energy',
    client: 'Tier-1 Oil & Gas Operator',
    kpi1: { value: '34%', label: 'Downtime Reduction' },
    kpi2: { value: '6hrs', label: 'Failure Lead Time' },
    summary: 'IoT time-series forecasting deployed to edge devices at remote well sites, predicting equipment failure before it happened.',
    tags: ['Azure ML', 'IoT Edge', 'ONNX', 'Time-Series'],
  }),
  caseItem({
    id: 'asset-maintenance-response-agent',
    industry: 'Energy',
    client: 'Asset & Maintenance Response Agent - Seplat Energy',
    kpi1: { value: 'Auto', label: 'Work Order Intelligence' },
    kpi2: { value: 'Optimal', label: 'Spare Part Allocation' },
    summary: 'Multi-agent asset management system automating predictive maintenance scheduling, spare part optimisation, work order prioritisation, and asset life cycle tracking across upstream oil and gas infrastructure.',
    tags: ['LangGraph', 'Azure ML', 'IoT', 'ONNX', 'FastAPI'],
  }),
  caseItem({
    id: 'procurement-analytics-platform-seplat',
    industry: 'Energy',
    client: 'Procurement Analytics Platform - Seplat Energy',
    kpi1: { value: '360', label: 'Spend Visibility' },
    kpi2: { value: 'T-SQL', label: 'SQL Server Engine' },
    summary: 'Enterprise procurement intelligence platform on SQL Server with T-SQL views, KPI dashboards, supplier performance analytics, and spend category reporting, delivering full procurement visibility to the Seplat leadership team.',
    tags: ['SQL Server', 'T-SQL', 'Power BI', 'SSRS', 'Procurement'],
  }),
  caseItem({
    id: 'scm-data-engineering-analytics-seplat',
    industry: 'Energy',
    client: 'SCM Data Engineering & Analytics - Seplat Energy',
    kpi1: { value: 'Unified', label: 'SCM Data Model' },
    kpi2: { value: 'Real-Time', label: 'Supply Chain KPIs' },
    summary: 'End-to-end supply chain data engineering and modelling platform, transforming fragmented SAP and legacy SCM data into a governed analytical layer with live dashboards for inventory, logistics, and vendor management.',
    tags: ['SAP', 'SQL Server', 'dbt', 'Power BI', 'DataOps'],
  }),
  caseItem({
    id: 'sap-ecc-azure-synapse-seplat',
    industry: 'Energy',
    client: 'SAP ECC to Azure Synapse Migration - Seplat Energy',
    kpi1: { value: 'Zero', label: 'Data Loss' },
    kpi2: { value: 'Full', label: 'Historical Lineage' },
    summary: 'Full SAP ECC to Azure Synapse data migration and engineering project, including extraction pipeline design, data modelling, schema transformation, delta load engineering, and post-migration analytics validation.',
    tags: ['SAP ECC', 'Azure Synapse', 'ADF', 'dbt', 'Synapse Analytics'],
  }),
  caseItem({
    id: 'azure-synapse-fabric-delta-lakehouse-seplat',
    industry: 'Energy',
    client: 'Azure Synapse Fabric - Delta Lakehouse - Seplat Energy',
    kpi1: { value: 'Delta', label: 'Lakehouse Architecture' },
    kpi2: { value: '99.9%', label: 'Pipeline Observability' },
    summary: 'Azure Synapse and Fabric-based Delta lakehouse and warehouse design with full observability, automated pipeline monitoring, and executive-grade reporting layers, replacing fragmented on-premises data stores at Seplat Energy.',
    tags: ['Azure Fabric', 'Synapse', 'Delta Lake', 'Spark', 'Power BI'],
  }),
  caseItem({
    id: 'prism-ne-real-time-analytics-seplat',
    industry: 'Energy',
    client: 'Prism NE - Real-Time Analytics - Seplat Energy',
    kpi1: { value: 'Real-Time', label: 'Analytics Engine' },
    kpi2: { value: 'Web', label: 'Segmentation Layer' },
    summary: 'Near-real-time analytics platform built on Azure Synapse with web segmentation, operational reporting, and executive dashboards, replacing batch-only reporting cycles with live operational intelligence.',
    tags: ['Azure Synapse', 'Synapse Analytics', 'Power BI', 'Real-Time', 'Seplat'],
  }),
  caseItem({
    id: 'market-intelligence-agent',
    industry: 'Energy',
    client: 'Intelligence & Insight Agent - Market Intelligence',
    kpi1: { value: 'Live', label: 'Market Intelligence' },
    kpi2: { value: 'AI', label: 'Strategic Briefings' },
    summary: 'Autonomous intelligence and insight agent continuously monitoring commodity markets, geopolitical signals, and competitor activity, delivering structured strategic briefings and decision-support outputs to executive stakeholders.',
    tags: ['GPT-4o', 'LangGraph', 'RAG', 'Kafka', 'NLP'],
  }),
  caseItem({
    id: 'agentic-enterprise',
    industry: 'Enterprise',
    client: 'Global Professional Services Firm',
    kpi1: { value: '80%', label: 'Time-to-Process Cut' },
    kpi2: { value: '12', label: 'Markets Deployed' },
    summary: 'Multi-agent AI system on Azure AI Foundry automating document ingestion, classification, and extraction across 12 countries.',
    tags: ['Azure AI Foundry', 'LangGraph', 'GPT-4o', 'RAG'],
  }),
  caseItem({
    id: 'ai-infrastructure-deployment-platform',
    industry: 'Enterprise',
    client: 'AI Infrastructure & Deployment Platform',
    kpi1: { value: 'Multi', label: 'Cloud Deployment' },
    kpi2: { value: 'AKS/EKS', label: 'Container Orchestration' },
    summary: 'Enterprise AI infrastructure and deployment platform across Azure, AWS, AKS, and EKS, providing the compute, container orchestration, and multi-agent system hosting layer for large-scale AI workloads.',
    tags: ['Azure', 'AWS', 'AKS', 'EKS', 'Terraform'],
  }),
  caseItem({
    id: 'procurement-agentic-system',
    industry: 'Enterprise',
    client: 'Procurement Agentic System',
    kpi1: { value: '7', label: 'Specialist Agents' },
    kpi2: { value: 'Policy', label: 'Governed Workflows' },
    summary: '7-agent procurement orchestration system handling requisition-to-PO workflows, supplier validation, policy compliance, approval routing, and spend governance, reducing procurement cycle times and enforcing spend controls automatically.',
    tags: ['LangGraph', 'MCP', 'Azure OpenAI', 'SAP', 'Governance'],
  }),
  caseItem({
    id: 'personalised-ai-assistant-enterprise',
    industry: 'Enterprise',
    client: 'Personalised AI Assistant - Enterprise',
    kpi1: { value: 'RAG', label: 'Enterprise Knowledge' },
    kpi2: { value: 'Sedat', label: 'Seplat Deployment' },
    summary: 'Personalised enterprise AI assistant built on RAG architecture with internal knowledge base integration, providing context-aware responses to employee queries across HR, procurement, and operational domains.',
    tags: ['RAG', 'GPT-4o', 'LangChain', 'Azure', 'FastAPI'],
  }),
  caseItem({
    id: 'lma-platform-enterprise-ai',
    industry: 'Enterprise',
    client: 'LMA Platform - Enterprise AI',
    kpi1: { value: 'LLM', label: 'Management Layer' },
    kpi2: { value: 'Unified', label: 'Model Access' },
    summary: 'LLM Management and Access platform providing unified model routing, prompt management, usage tracking, cost controls, and multi-model orchestration across GPT-4o, Claude, and Llama deployments.',
    tags: ['LLMOps', 'GPT-4o', 'Claude', 'Llama', 'Azure'],
  }),
  caseItem({
    id: 'lakehouse-retail',
    industry: 'Retail',
    client: 'Pan-African Retail Group',
    kpi1: { value: '3wks to 2hrs', label: 'Reporting Cycle' },
    kpi2: { value: '5', label: 'ERPs Unified' },
    summary: 'Medallion lakehouse on Azure Fabric with OneLake unifying five legacy ERPs into a single real-time analytics layer.',
    tags: ['Azure Fabric', 'OneLake', 'Spark', 'Power BI'],
  }),
  caseItem({
    id: 'customer-segmentation-action-system',
    industry: 'Retail',
    client: 'Customer Segmentation Action System',
    kpi1: { value: '5', label: 'Specialist Agents' },
    kpi2: { value: 'Real-Time', label: 'Segment Activation' },
    summary: '5-agent customer segmentation and action system performing live behavioural analysis, cohort classification, personalised offer generation, and campaign activation, transforming passive segments into dynamic revenue actions.',
    tags: ['LangGraph', 'Spark', 'Azure ML', 'Kafka', 'FastAPI'],
  }),
  caseItem({
    id: 'agentic-commerce-platform-tablibau',
    industry: 'Retail',
    client: 'Agentic Commerce Platform - Tablibau',
    kpi1: { value: 'Agentic', label: 'Commerce Flows' },
    kpi2: { value: 'End-to-End', label: 'Order Automation' },
    summary: 'Agentic commerce platform with AI agents handling product discovery, order placement, inventory validation, fulfilment routing, and post-purchase support, enabling fully automated commerce workflows.',
    tags: ['LangGraph', 'MCP', 'RAG', 'FastAPI', 'MERN'],
  }),
  caseItem({
    id: 'predictive-analytics-bi-platform',
    industry: 'Retail',
    client: 'Predictive Analytics & BI Platform',
    kpi1: { value: 'Predictive', label: 'Demand Engine' },
    kpi2: { value: 'Executive', label: 'Analytics Portal' },
    summary: 'Enterprise predictive analytics and BI platform with demand forecasting, inventory optimisation models, and an executive analytics portal delivering actionable intelligence across retail operations.',
    tags: ['Azure ML', 'Power BI', 'Forecasting', 'dbt', 'Statistical ML'],
  }),
  caseItem({
    id: 'mlops-healthcare',
    industry: 'Healthcare',
    client: 'Health Insurance Provider',
    kpi1: { value: '100%', label: 'Model Observability' },
    kpi2: { value: '4x', label: 'Deploy Frequency' },
    summary: 'End-to-end MLOps platform with drift detection, MLflow model registry, and GitHub Actions CI/CD, replacing fully manual deployments.',
    tags: ['Azure ML', 'MLflow', 'Evidently', 'Terraform'],
  }),
  caseItem({
    id: 'surgical-tool-detection-system',
    industry: 'Healthcare',
    client: 'Surgical Tool Detection System',
    kpi1: { value: 'Real-Time', label: 'Vision Detection' },
    kpi2: { value: 'Edge', label: 'Deployed Model' },
    summary: 'Computer vision system for real-time surgical tool detection and tracking in operating theatre environments, deployed on edge hardware with sub-100ms inference for intraoperative safety and instrument accountability.',
    tags: ['YOLOv8', 'ONNX', 'Edge AI', 'TF Lite', 'FastAPI'],
  }),
  caseItem({
    id: 'cloud-manufacturing',
    industry: 'Manufacturing',
    client: 'Industrial Manufacturer',
    kpi1: { value: '41%', label: 'Cost Saved' },
    kpi2: { value: '99.99%', label: 'Post-Migration Uptime' },
    summary: 'Phased migration to Azure using Bicep IaC with zero-downtime cutover, replacing on-premises infrastructure that blocked digital transformation.',
    tags: ['Azure', 'Bicep', 'IaC', 'DevOps'],
  }),
  caseItem({
    id: 'tensor-split-ai-design-agent',
    industry: 'Manufacturing',
    client: 'Tensor Split - AI Design Agent',
    kpi1: { value: 'AI', label: 'Design Automation' },
    kpi2: { value: 'Split', label: 'Parallel Processing' },
    summary: 'AI design agent using tensor-split parallel processing to automate engineering design validation, tolerance analysis, and manufacturing specification generation, reducing design review cycles in precision manufacturing.',
    tags: ['PyTorch', 'ONNX', 'FastAPI', 'Azure ML', 'Agentic AI'],
  }),
  caseItem({
    id: 'elitem-prep-blockchain-supply-chain',
    industry: 'Manufacturing',
    client: 'Elitem Prep - Blockchain Supply Chain',
    kpi1: { value: '4', label: 'Agent Coordination' },
    kpi2: { value: 'On-Chain', label: 'Provenance Tracking' },
    summary: 'Blockchain-backed supply chain provenance system with 4 coordinated agents managing material certification, supplier verification, chain-of-custody tracking, and on-chain compliance attestation for regulated manufacturing.',
    tags: ['Blockchain', 'Solidity', 'LangGraph', 'Web3', 'IPFS'],
  }),
  caseItem({
    id: 'rhemaai-platform-website-seo',
    industry: 'Data Engineering',
    client: 'RhemaAI Platform - Website & SEO',
    kpi1: { value: '100%', label: 'Lighthouse SEO Score' },
    kpi2: { value: 'Indexed', label: 'By Google' },
    summary: 'Full MERN stack web application for RhemaAI Solutions deployed with 100% Lighthouse SEO score, Google indexing, optimised Core Web Vitals, and integrated reporting and visualisation dashboards.',
    tags: ['MERN', 'SEO', 'Lighthouse', 'Hostinger KVM', 'Stripe'],
  }),
  caseItem({
    id: 'adso-azure-synapse-migration-seplat',
    industry: 'Data Engineering',
    client: 'ADSO to Azure Synapse Migration - Seplat',
    kpi1: { value: 'Full', label: 'Data Migration' },
    kpi2: { value: 'Zero', label: 'Business Disruption' },
    summary: 'Migration of SAP ADSO structures to Azure Synapse with full data fidelity, schema translation, delta load engineering, and post-migration validation, enabling cloud-native analytics on previously locked SAP data.',
    tags: ['SAP ADSO', 'Azure Synapse', 'ADF', 'Spark', 'Data Migration'],
  }),
  caseItem({
    id: 'predictive-analytics-data-engine',
    industry: 'Data Engineering',
    client: 'Predictive Analytics Data Engine',
    kpi1: { value: 'ML', label: 'Modelling Layer' },
    kpi2: { value: 'Unified', label: 'Analytics Platform' },
    summary: 'Enterprise predictive analytics data engine combining feature engineering, ML modelling, and an analytics portal, providing a reusable accelerator for deploying predictive intelligence across multiple business domains.',
    tags: ['Azure ML', 'dbt', 'Spark', 'MLflow', 'Power BI'],
  }),
]

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function CaseStudiesPage() {
  const [active, setActive] = useState('All')
  const [cases, setCases] = useState(CASES)
  const filters = useMemo(() => {
    const industries = Array.from(new Set(cases.map((item) => item.industry))).filter(Boolean)
    return ['All', ...sortIndustries(industries)]
  }, [cases])
  const filtered = active === 'All' ? cases : cases.filter((c) => c.industry === active)

  useEffect(() => {
    caseStudiesAPI.getAll({ limit: 100 })
      .then((data) => {
        if (data.caseStudies?.length) setCases(mergeCases(data.caseStudies))
      })
      .catch(() => { /* static case studies stay visible */ })
  }, [])

  return (
    <>
      <PageSEO
        title="Enterprise AI & Data Engineering Case Studies | RhemaAI Solutions Ltd"
        description="Production deployments across FinTech, Energy, Enterprise, Retail, Healthcare, Manufacturing and Data Engineering, built and delivered by RhemaAI Solutions."
        keywords="AI case studies Nigeria, data engineering results Africa, enterprise AI ROI, agentic AI deployment, Azure cloud case study, machine learning business outcomes, data science projects fintech energy"
      />

      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.grid} />
          <div className="container">
            <motion.div
              className={styles.heroInner}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.heroText}>
                <span className={styles.badge}>RhemaAI Solutions Ltd - Case Studies</span>
                <h1 className={styles.title}>
                  Real Systems.<br />
                  <span className={styles.accent}>Measurable Outcomes.</span>
                </h1>
                <p className={styles.sub}>
                  Production deployments across FinTech, Energy, Enterprise, Retail,
                  Healthcare, Manufacturing, and Data Engineering, built and delivered
                  by RhemaAI Solutions.
                </p>
              </div>

              <div className={styles.heroStats}>
                <div className={styles.hStat}><strong>{CASES.length}</strong><span>Case Studies</span></div>
                <div className={styles.hDiv} />
                <div className={styles.hStat}><strong>7</strong><span>Industry Verticals</span></div>
                <div className={styles.hDiv} />
                <div className={styles.hStat}><strong>AI</strong><span>Production Systems</span></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <div className="container">

            <div className={styles.filters}>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
                  style={{ '--accent': getIndustryAccent(f) }}
                  onClick={() => setActive(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className={styles.cardGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {filtered.map((cs, i) => (
                  <motion.article
                    key={cs._id || cs.id || cs.slug}
                    className={styles.card}
                    custom={i}
                    variants={cardAnim}
                    initial="hidden"
                    animate="show"
                    style={{ '--accent': getCaseAccent(cs) }}
                  >
                    <div className={styles.cardHead}>
                      <span className={styles.industryTag}>{cs.industry}</span>
                      <p className={styles.clientName}>{cs.client}</p>
                    </div>

                    <div className={styles.kpis}>
                      <div className={styles.kpi}>
                        <strong className={styles.kpiVal}>{cs.kpi1.value}</strong>
                        <span className={styles.kpiLabel}>{cs.kpi1.label}</span>
                      </div>
                      <div className={styles.kpiDiv} />
                      <div className={styles.kpi}>
                        <strong className={styles.kpiVal}>{cs.kpi2.value}</strong>
                        <span className={styles.kpiLabel}>{cs.kpi2.label}</span>
                      </div>
                    </div>

                    <p className={styles.summary}>{cs.summary}</p>

                    <div className={styles.tags}>
                      {(cs.tags || []).map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaInner}>
              <div>
                <h2 className={styles.ctaTitle}>Ready to Be Next?</h2>
                <p className={styles.ctaSub}>Tell us your problem. We'll tell you how we'd solve it.</p>
              </div>
              <Link to="/contact" className={styles.ctaBtn}>Book a Free Discovery Call</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
