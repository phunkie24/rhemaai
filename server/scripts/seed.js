import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Insight from '../models/Insight.js'
import { Subscriber } from '../models/Subscriber.js'
import Contact from '../models/Contact.js'
import Publication from '../models/Publication.js'
import Product from '../models/Product.js'
import CaseStudy from '../models/CaseStudy.js'

const insights = [
  {
    title: 'Building Agentic AI Systems at Enterprise Scale',
    slug: 'building-agentic-ai-systems-enterprise-scale',
    excerpt: 'Autonomous AI agents are reshaping how enterprises automate complex workflows. We explore the architecture patterns, orchestration frameworks, and deployment strategies that make production-grade agentic systems reliable.',
    content: `## Introduction

Agentic AI represents a paradigm shift from passive models to autonomous systems capable of planning, reasoning, and acting on multi-step objectives without human intervention at each step.

## Core Architecture Patterns

### Single-Agent Systems
Best for well-defined, linear tasks. A single LLM with tool access handles the full task loop.

### Multi-Agent Orchestration
Complex workflows benefit from specialised agents: a Planner, Executor, Critic, and Memory agent working in concert.

## Tool Integration

Production agents require robust tool registries:
- **Web search** — real-time information retrieval
- **Code execution** — sandboxed Python/SQL runners
- **API connectors** — ERP, CRM, cloud services
- **Document stores** — vector databases for RAG

## Reliability Patterns

1. **Structured outputs** — JSON schema validation prevents agent drift
2. **Guardrails** — content filters and action whitelists
3. **Human-in-the-loop** — approval gates for high-impact actions
4. **Observability** — full trace logging for every agent decision

## Deployment on Azure

Azure AI Foundry provides managed infrastructure for agentic workloads, including thread management, tool routing, and usage metering.

## Conclusion

The enterprises seeing the highest ROI from agentic AI are those that start narrow — automating one well-defined process — then expand based on measured outcomes.`,
    category: 'agentic-ai',
    tags: ['agentic-ai', 'llm', 'automation', 'azure-ai-foundry', 'orchestration'],
    readTime: 9,
    published: true,
    publishedAt: new Date('2026-05-10'),
    author: { name: 'RhemaAI Solutions Ltd Team' },
    seo: {
      metaTitle: 'Building Agentic AI Systems at Enterprise Scale | RhemaAI Solutions Ltd',
      metaDescription: 'Architecture patterns and deployment strategies for production-grade agentic AI systems on Azure.',
    },
  },
  {
    title: 'Modern Data Lakehouse Architecture on Azure Fabric',
    slug: 'modern-data-lakehouse-azure-fabric',
    excerpt: 'Azure Fabric unifies OneLake, Spark, and Power BI into a single governance boundary. We walk through designing a medallion architecture that eliminates data silos and accelerates time-to-insight.',
    content: `## The Lakehouse Paradigm

The lakehouse combines the low-cost storage of a data lake with the ACID transactions and SQL semantics of a warehouse.

## Azure Fabric Components

| Component | Role |
|-----------|------|
| OneLake | Universal storage layer |
| Fabric Spark | Large-scale data processing |
| Data Factory | Orchestration & ingestion |
| Synapse Analytics | SQL compute |
| Power BI | Reporting & dashboards |

## Medallion Architecture

### Bronze (Raw)
Exact copy of source data. No transformation. Immutable.

### Silver (Curated)
Cleaned, deduplicated, schema-enforced. Business entities emerge here.

### Gold (Aggregated)
Domain-specific aggregates optimised for BI and ML feature engineering.

## Data Quality with Great Expectations

Embed quality checks between Bronze → Silver to catch upstream drift early.

## Governance

Azure Purview provides data cataloguing, lineage, and sensitivity classification across all Fabric workloads from a single pane.`,
    category: 'data-engineering',
    tags: ['azure-fabric', 'data-lakehouse', 'medallion', 'data-engineering', 'onelake'],
    readTime: 11,
    published: true,
    publishedAt: new Date('2026-04-22'),
    author: { name: 'RhemaAI Solutions Ltd Team' },
    seo: {
      metaTitle: 'Modern Data Lakehouse Architecture on Azure Fabric | RhemaAI Solutions Ltd',
      metaDescription: 'Design a production medallion architecture on Azure Fabric that eliminates data silos and accelerates analytics.',
    },
  },
  {
    title: 'Predictive Analytics for Energy Sector: A Case Study',
    slug: 'predictive-analytics-energy-sector-case-study',
    excerpt: 'How we helped a Tier-1 oil & gas operator reduce unplanned downtime by 34% using time-series forecasting models built on Azure ML and deployed to edge devices at remote well sites.',
    content: `## Client Challenge

An upstream oil & gas operator faced ₦2.3B per year in unplanned equipment downtime. Sensor data existed but was siloed across 120 well sites with no predictive capability.

## Solution Architecture

### Data Ingestion
Azure IoT Hub collected 850 sensor streams at 1-second intervals. Event Hubs buffered peaks during connectivity drops.

### Feature Engineering
- Rolling statistics (mean, std, min/max) over 1h, 6h, 24h windows
- FFT features for vibration signals
- Lagged targets for sequence modelling

### Model Development

We evaluated three approaches:

1. **LSTM** — captured temporal dependencies but required GPU inference
2. **LightGBM with lag features** — 90% of LSTM accuracy at 10× speed
3. **Prophet + residual XGBoost** — best interpretability for operations teams

LightGBM was selected for production due to inference latency constraints at the edge.

### Edge Deployment

Models were packaged as ONNX and deployed to Raspberry Pi 4 units at each well site using Azure IoT Edge. Local inference runs offline with cloud sync every 6 hours.

## Results

| Metric | Before | After |
|--------|--------|-------|
| Unplanned downtime | 340 hrs/yr | 225 hrs/yr |
| MTTR | 14 hours | 8 hours |
| False alarm rate | — | 4.2% |
| ROI | — | 580% in Year 1 |`,
    category: 'data-science',
    tags: ['predictive-analytics', 'time-series', 'oil-gas', 'iot', 'azure-ml', 'edge-ai'],
    readTime: 12,
    published: true,
    publishedAt: new Date('2026-04-05'),
    author: { name: 'RhemaAI Solutions Ltd Team' },
    seo: {
      metaTitle: 'Predictive Analytics for Energy Sector Case Study | RhemaAI Solutions Ltd',
      metaDescription: 'How time-series ML models reduced unplanned downtime by 34% for an oil & gas operator.',
    },
  },
  {
    title: 'MLOps Best Practices with Azure ML and GitHub Actions',
    slug: 'mlops-best-practices-azure-ml-github-actions',
    excerpt: 'MLOps bridges the gap between model development and reliable production deployment. This guide covers CI/CD pipelines for ML, model registry, drift detection, and automated retraining triggers.',
    content: `## Why MLOps Matters

A model that performs well in a notebook but degrades silently in production is worse than no model — it creates false confidence.

## The MLOps Lifecycle

\`\`\`
Data → Feature Store → Training → Evaluation → Registry → Deployment → Monitoring → Retraining
\`\`\`

## CI/CD Pipeline with GitHub Actions

\`\`\`yaml
name: ML Pipeline
on:
  push:
    branches: [main]
    paths: ['src/models/**', 'data/features/**']

jobs:
  train-evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Train model
        run: python src/train.py --experiment $GITHUB_SHA
      - name: Evaluate
        run: python src/evaluate.py --threshold 0.85
      - name: Register model
        if: success()
        run: python src/register.py
\`\`\`

## Model Registry with Azure ML

Track all experiment metrics, parameters, and artefacts. Promote models through: Staging → Champion → Retired.

## Drift Detection

Monitor data drift (input distribution shift) and concept drift (relationship change) weekly with Azure ML's DataDriftDetector.

## Automated Retraining

Trigger retraining when:
- PSI > 0.2 on key features
- Model accuracy drops below a threshold
- New labelled data exceeds a batch size`,
    category: 'mlops',
    tags: ['mlops', 'azure-ml', 'github-actions', 'ci-cd', 'model-monitoring', 'drift-detection'],
    readTime: 10,
    published: true,
    publishedAt: new Date('2026-03-18'),
    author: { name: 'RhemaAI Solutions Ltd Team' },
    seo: {
      metaTitle: 'MLOps Best Practices with Azure ML and GitHub Actions | RhemaAI Solutions Ltd',
      metaDescription: 'End-to-end MLOps pipeline setup with Azure ML, model registry, drift detection, and GitHub Actions CI/CD.',
    },
  },
  {
    title: 'AI-Powered Fraud Detection in FinTech: Architecture Guide',
    slug: 'ai-fraud-detection-fintech-architecture-guide',
    excerpt: 'Real-time fraud detection demands sub-50ms inference, high recall, and explainable decisions for compliance. We detail the streaming architecture and model stack used to protect a West African digital bank.',
    content: `## The Fraud Detection Challenge

Digital banks in emerging markets face fraud rates 3-5× higher than traditional banks due to lower KYC maturity and newer payment rails.

## System Requirements

- **Latency**: < 50ms end-to-end (p99)
- **Throughput**: 2,000 transactions/second at peak
- **Recall**: > 92% (minimise missed fraud)
- **Precision**: > 75% (minimise customer friction)
- **Explainability**: SHAP values for every decision

## Streaming Architecture

\`\`\`
Payment API → Kafka → Feature Service → ML Scoring → Decision Engine → Core Banking
                ↓
         Feature Store (Redis)
                ↓
        Historical Store (Delta Lake)
\`\`\`

## Feature Engineering

### Real-time Features (Redis, TTL 24h)
- Transaction velocity: count, sum in last 1/6/24 hours
- Merchant category frequency
- Device fingerprint novelty score
- Location distance from home cluster

### Historical Features (Delta Lake)
- 90-day spend baseline
- Chargeback history
- Account age and product tenure

## Model Stack

### Layer 1: Rules Engine
Fast hard rules: impossible velocity, known bad actors, blocked merchants. Zero ML compute.

### Layer 2: GBM Score
LightGBM on ~200 features. Calibrated probability output.

### Layer 3: Graph Neural Network
Detects fraud rings via transaction graph topology. Deployed separately with 100ms SLA.

## Compliance

Every decision includes SHAP feature attributions stored in a compliance ledger for audit trail requirements under CBN regulations.`,
    category: 'fintech',
    tags: ['fraud-detection', 'fintech', 'real-time-ml', 'kafka', 'lgbm', 'graph-neural-network'],
    readTime: 13,
    published: true,
    publishedAt: new Date('2026-03-01'),
    author: { name: 'RhemaAI Solutions Ltd Team' },
    seo: {
      metaTitle: 'AI Fraud Detection in FinTech Architecture Guide | RhemaAI Solutions Ltd',
      metaDescription: 'Real-time fraud detection architecture for digital banks — streaming, ML scoring, and compliance explainability.',
    },
  },
  {
    title: 'Enterprise AI Transformation: A 90-Day Roadmap',
    slug: 'enterprise-ai-transformation-90-day-roadmap',
    excerpt: 'Most enterprise AI initiatives fail not from lack of technology but from lack of structure. This proven 90-day framework takes organisations from AI readiness assessment to live production use cases.',
    content: `## Why AI Transformations Stall

Survey data consistently shows 85% of AI projects never reach production. The root causes are organisational, not technical: undefined ownership, poor data quality, and misaligned business cases.

## The 90-Day Framework

### Days 1–15: Discovery & Assessment
- Data maturity audit across all source systems
- Identify 3-5 high-value AI use cases with clear KPIs
- Assess team capability gaps
- Establish AI governance charter

### Days 16–45: Foundation
- Deploy cloud data platform (Azure Fabric or equivalent)
- Implement data quality framework
- Set up ML platform (Azure ML)
- Upskill team: 40 hours structured training

### Days 46–75: Build & Validate
- Develop and test 2 priority use cases in staging
- Validate against KPIs with business stakeholders
- Security and compliance review
- Define rollback procedures

### Days 76–90: Launch & Measure
- Phased production rollout (10% → 50% → 100% traffic)
- Establish monitoring dashboards
- Document lessons learned
- Plan Phase 2 use cases

## Governance Throughout

AI governance should not be a phase — it is a thread running through all 90 days: model cards, data contracts, bias evaluations, and change management.

## Success Metrics

A successful 90-day engagement delivers:
- 1-2 live AI features in production
- A trained internal team that can operate and extend
- A governed data platform that enables future use cases
- A documented AI strategy aligned to business goals`,
    category: 'enterprise-ai',
    tags: ['enterprise-ai', 'digital-transformation', 'ai-strategy', 'roadmap', 'governance'],
    readTime: 8,
    published: true,
    publishedAt: new Date('2026-02-14'),
    author: { name: 'RhemaAI Solutions Ltd Team' },
    seo: {
      metaTitle: 'Enterprise AI Transformation: A 90-Day Roadmap | RhemaAI Solutions Ltd',
      metaDescription: 'A proven 90-day framework for enterprise AI transformation from readiness assessment to live production.',
    },
  },
]

const subscribers = [
  { email: 'tech.lead@acme.io', source: 'website' },
  { email: 'cto@energycorp.ng', source: 'blog' },
  { email: 'data.team@fintech.co', source: 'website' },
]

const contacts = [
  {
    name: 'Amaka Okafor',
    email: 'amaka.okafor@energycorp.ng',
    company: 'EnergyCore Nigeria',
    service: 'data-science',
    budget: '50k-100k',
    message: 'We are looking to build predictive maintenance models for our pipeline infrastructure. We have 3 years of sensor data across 80 assets.',
    status: 'replied',
  },
  {
    name: 'Chukwudi Eze',
    email: 'c.eze@finvest.africa',
    company: 'FinVest Africa',
    service: 'fintech-blockchain',
    budget: 'above-100k',
    message: 'We need to build a real-time fraud detection system for our mobile money platform. Currently processing 500K transactions per day.',
    status: 'new',
  },
]

const publications = [
  {
    title: 'Multi-Agent Orchestration Patterns for Enterprise Scale Systems',
    slug: 'multi-agent-orchestration-patterns-enterprise-scale-systems',
    type: 'book',
    summary: 'Architectures, patterns and operational practices for reliable, governed and scalable multi-agent AI systems in enterprise environments.',
    body: `Multi-Agent Orchestration Patterns for Enterprise Scale Systems is a practical guide for architects, founders and technology leaders designing reliable agentic AI systems.

The book covers orchestration patterns, governance controls, observability, operational practices and enterprise-scale delivery approaches for multi-agent AI systems.`,
    coverImage: '/api/uploads/multi-agent-book-cover.jpg',
    tags: ['Multi-Agent Systems', 'Agentic AI', 'Enterprise Architecture', 'Governance'],
    price: {
      amount: 0,
      currency: 'USD',
      label: 'New release',
    },
    featured: true,
    published: true,
    publishedAt: new Date('2026-06-10'),
    author: { name: 'Funke R. Yusuf' },
    seo: {
      metaTitle: 'Multi-Agent Orchestration Patterns Book | Funke R. Yusuf',
      metaDescription: 'A practical enterprise AI book on multi-agent orchestration patterns, governed agentic AI systems, architecture and operations.',
      canonicalUrl: '/publications',
      keywords: ['multi-agent orchestration', 'agentic AI', 'enterprise AI', 'AI governance'],
    },
  },
]

// ---------------------------------------------------------------------------
// Products & Case Studies — mirrors the client-side fallback content in
// client/src/pages/ProductsPage.jsx (SEED_PRODUCTS) and
// client/src/pages/CaseStudiesPage.jsx (CASES) so the database — and
// therefore the sitemap, the bot prerender routes, and the /api endpoints —
// actually reflects the content the site has been showing (and getting
// indexed) all along via client-side fallback data.
// ---------------------------------------------------------------------------

function productDescription(summary, features) {
  return `${summary}

### Core Capabilities

${features.map((feature) => `- ${feature}`).join('\n')}

### Delivery Fit

Use this product as a focused accelerator, or combine it with adjacent RhemaAI platform modules for a fuller AI, data, cloud, or mathematics operating model.`
}

function product({ slug, name, kicker, summary, tags, features, featured = false, productUrl }) {
  return {
    slug,
    name,
    kicker,
    category: 'platform',
    summary,
    description: productDescription(summary, features),
    tags,
    featured,
    published: true,
    publishedAt: new Date('2026-01-15'),
    productUrl,
    pricing: { label: 'Contact sales' },
  }
}

const products = [
  product({
    slug: 'nexus-aos', name: 'Nexus AOS', kicker: 'Agentic Orchestration System',
    summary: 'Enterprise control plane for deploying, monitoring and governing multi-agent AI systems across complex business workflows with human-in-the-loop approvals and measurable outcomes.',
    tags: ['Flagship', 'Agentic AI', 'AgentOps', 'MCP'],
    features: [
      'Multi-agent graph orchestration with ADAS and LangGraph patterns',
      'Approval gates, rollback controls and audit trails',
      'Real-time agent telemetry and business KPI mapping',
      'MCP server integration and governed tool registry',
    ],
    featured: true,
  }),
  product({
    slug: 'apex-rag', name: 'Apex RAG', kicker: 'Retrieval-Augmented Generation Platform',
    summary: 'Production RAG infrastructure with vector indexing, hybrid search, re-ranking pipelines and enterprise knowledge graph connectors for grounded, hallucination-controlled AI.',
    tags: ['Knowledge AI', 'RAG', 'Vector Search', 'Evaluation'],
    features: [
      'Hybrid dense and sparse vector retrieval',
      'Re-ranking, context compression and citation workflows',
      'Enterprise connector library for SharePoint, SAP and SQL systems',
      'Evaluation framework with RAGAS metrics',
    ],
  }),
  product({
    slug: 'lyra-nlp', name: 'Lyra NLP', kicker: 'NLP & Document Intelligence Platform',
    summary: 'Transform unstructured enterprise text into structured intelligence for contract analysis, document classification, semantic search and multilingual NLP across African and global markets.',
    tags: ['Language AI', 'Document AI', 'Search', 'NLP'],
    features: [
      'Contract intelligence and clause extraction',
      'Multilingual NLP with African language support',
      'Named entity recognition and knowledge graph construction',
      'Semantic search and document Q&A workflows',
    ],
  }),
  product({
    slug: 'aura-xai', name: 'Aura XAI', kicker: 'Explainable AI & Model Interpretability',
    summary: 'Mathematical interpretability infrastructure for regulated AI deployments, making model predictions auditable, bias-tested and aligned with model risk standards.',
    tags: ['Explainability', 'Model Risk', 'Fairness', 'Audit'],
    features: [
      'SHAP, LIME and feature attribution dashboards',
      'Bias detection and algorithmic fairness audits',
      'Regulatory compliance mapping for EU AI Act-style controls',
      'Model card generation and audit trails',
    ],
  }),
  product({
    slug: 'vega-oas', name: 'Vega OAS', kicker: 'Optimisation & Analytics System',
    summary: 'Convex and nonlinear optimisation engine for enterprise decision problems across supply chain, resource scheduling, portfolio allocation and operations research.',
    tags: ['Flagship', 'Optimisation', 'Analytics', 'OR'],
    features: [
      'Linear, nonlinear and integer programming solvers',
      'Stochastic optimisation and simulation',
      'Operations research workflow designer',
      'Sensitivity analysis and scenario modelling',
    ],
    featured: true,
  }),
  product({
    slug: 'prism-bi', name: 'Prism BI', kicker: 'Business Intelligence & Decision Platform',
    summary: 'AI-powered BI layer that transforms warehouse data into narrative intelligence through automated executive dashboards, natural language querying and recommendations.',
    tags: ['Decision Intel', 'BI', 'NLQ', 'Reporting'],
    features: [
      'Natural language to SQL query engine',
      'Automated narrative report generation',
      'Executive dashboard and KPI command centre',
      'Prescriptive action recommendations',
    ],
  }),
  product({
    slug: 'orbit-cx', name: 'Orbit CX', kicker: 'Customer Intelligence & Segmentation',
    summary: '360-degree customer intelligence platform with ML-driven segmentation, CLV modelling, churn prediction and AI-powered personalisation engines.',
    tags: ['Customer Intel', 'Segmentation', 'Churn', 'CLV'],
    features: [
      'Behavioural segmentation and CLV modelling',
      'Churn prediction and retention intelligence',
      'Real-time personalisation engine',
      'Attribution modelling and campaign analytics',
    ],
  }),
  product({
    slug: 'stratum-dx', name: 'Stratum DX', kicker: 'Data Engineering & Analytics Platform',
    summary: 'Medallion lakehouse accelerator with governed ingestion, Bronze-Silver-Gold transformation layers, lineage tracking, analytics products and trusted reporting foundations.',
    tags: ['Flagship', 'Data Platform', 'Lakehouse', 'DataOps'],
    features: [
      'Bronze-Silver-Gold medallion architecture',
      'High-throughput ETL and ELT with Spark and dbt',
      'Data lineage, cataloguing and governance',
      'SAP ECC, Synapse and Databricks integrations',
    ],
    featured: true,
  }),
  product({
    slug: 'flux-cdc', name: 'Flux CDC', kicker: 'Real-Time Streaming & Change Data Capture',
    summary: 'High-throughput real-time data streaming platform with CDC pipelines, event-driven architecture, schema registry and exactly-once delivery guarantees.',
    tags: ['Streaming', 'CDC', 'Kafka', 'Flink'],
    features: [
      'Kafka and Flink-based streaming pipelines',
      'Database CDC with Debezium connectors',
      'Schema registry and data contract enforcement',
      'Exactly-once semantics and dead-letter queues',
    ],
  }),
  product({
    slug: 'meridian-dq', name: 'Meridian DQ', kicker: 'Data Quality & Observability Platform',
    summary: 'Continuous data quality monitoring with rule engines, anomaly detection, pipeline observability and trust scores for full visibility into data asset health.',
    tags: ['Data Quality', 'Observability', 'Lineage', 'Trust'],
    features: [
      'Declarative quality rule engine for high-volume checks',
      'Statistical anomaly detection on data distributions',
      'End-to-end pipeline lineage and impact analysis',
      'Data trust scores and executive health reporting',
    ],
  }),
  product({
    slug: 'corda-fs', name: 'Corda FS', kicker: 'Feature Store & ML Data Platform',
    summary: 'Centralised feature store eliminating training-serving skew with versioned feature pipelines, point-in-time correctness and online/offline serving.',
    tags: ['ML Data', 'Feature Store', 'Feast', 'Lineage'],
    features: [
      'Online low-latency and offline batch feature serving',
      'Point-in-time correct training datasets',
      'Feature versioning, lineage and discovery portal',
      'Adapters for Feast, Tecton and Databricks Feature Store',
    ],
  }),
  product({
    slug: 'helix-lz', name: 'Helix LZ', kicker: 'Cloud Landing Zone Kit',
    summary: 'Secure, opinionated multi-cloud architecture patterns across Azure, AWS and GCP with governance rails, cost controls and GitOps pipelines from day one.',
    tags: ['Cloud', 'Azure', 'AWS', 'GCP'],
    features: [
      'Enterprise landing zone IaC with Terraform and Bicep',
      'Kubernetes orchestration and container governance',
      'FinOps dashboards and cloud cost guardrails',
      'GitOps CI/CD with security policy gates',
    ],
  }),
  product({
    slug: 'krato-ml', name: 'Krato ML', kicker: 'MLOps Command Stack',
    summary: 'End-to-end ML lifecycle platform covering experiment tracking, model registry, CI/CD for ML, drift monitoring and automated retraining workflows.',
    tags: ['MLOps', 'MLflow', 'Drift', 'ModelOps'],
    features: [
      'Experiment tracking and model versioning registry',
      'Automated retraining on drift thresholds',
      'Model deployment with canary and shadow modes',
      'Low-latency scoring controls and service-level monitoring',
    ],
  }),
  product({
    slug: 'cipher-gx', name: 'Cipher GX', kicker: 'Cybersecurity & Cloud Security Posture',
    summary: 'Unified cloud security and governance platform for continuous CSPM, Zero Trust IAM, threat detection, SIEM integration and regulatory compliance.',
    tags: ['Security', 'CSPM', 'Zero Trust', 'SIEM'],
    features: [
      'Cloud security posture management',
      'Zero Trust identity and access governance',
      'SIEM integration and automated incident response',
      'Compliance frameworks covering ISO 27001, SOC 2 and NDPA',
    ],
  }),
  product({
    slug: 'axiom-qr', name: 'Axiom QR', kicker: 'Quantitative Research & Statistical Modelling',
    summary: 'Mathematical consulting and research platform grounded in functional analysis, statistical modelling, actuarial work and bespoke quantitative research.',
    tags: ['Quant Research', 'Statistics', 'Bayesian', 'Actuarial'],
    features: [
      'Functional analysis and operator-theory applications',
      'Bayesian inference and high-dimensional modelling',
      'Actuarial modelling and insurance mathematics',
      'Academic-industry research partnerships',
    ],
  }),
  product({
    slug: 'ledger-fm', name: 'Ledger FM', kicker: 'Financial Mathematics & Risk Platform',
    summary: 'Quantitative finance solutions bridging stochastic calculus and production financial systems for derivatives pricing, risk modelling and portfolio optimisation.',
    tags: ['Financial Math', 'Risk', 'Quant Finance', 'Portfolio'],
    features: [
      'Stochastic modelling and derivatives pricing',
      'VaR, CVaR and stress testing frameworks',
      'Portfolio optimisation and asset allocation',
      'Algorithmic and quantitative strategy development',
    ],
  }),
  product({
    slug: 'sigma-im', name: 'Sigma IM', kicker: 'Industrial Mathematics & Simulation',
    summary: 'Mathematical modelling and simulation for engineering and operational problems across energy, manufacturing, logistics and physical systems.',
    tags: ['Industrial Math', 'Simulation', 'PDE', 'Operations'],
    features: [
      'ODE and PDE modelling for physical systems',
      'Convex optimisation and operations research',
      'Numerical methods and computational analysis',
      'Discrete-event and Monte Carlo simulation',
    ],
  }),
  product({
    slug: 'volta-ei', name: 'Volta EI', kicker: 'Edge AI & IoT Intelligence Platform',
    summary: 'Deploy lightweight, compressed AI models on edge devices and IoT infrastructure for industrial monitoring, predictive maintenance and edge inference.',
    tags: ['Edge AI', 'IoT', 'Anomaly Detection', 'Industry'],
    features: [
      'Model quantisation, pruning and edge compression',
      'IoT sensor telemetry pipelines with MQTT and OPC-UA',
      'Predictive maintenance and anomaly detection',
      'Industrial AI for energy and manufacturing sectors',
    ],
  }),
  product({
    slug: 'forge-se', name: 'Forge SE', kicker: 'Enterprise Software Engineering Accelerator',
    summary: 'Production-grade backend and API accelerator patterns for C# .NET, Python FastAPI and MERN systems engineered for enterprise reliability.',
    tags: ['Software', 'APIs', '.NET', 'FastAPI'],
    features: [
      'C# ASP.NET Core enterprise system templates',
      'Python FastAPI microservices accelerator',
      'MERN stack SaaS platform scaffold',
      'GraphQL, REST and event-driven API patterns',
    ],
  }),
  product({
    slug: 'rhema-academy', name: 'Rhema Academy', kicker: 'Technical Training & Certification Platform',
    summary: 'Enterprise upskilling programmes in AI, data engineering, cloud architecture and applied mathematics delivered by production practitioners.',
    tags: ['Academy', 'Training', 'Certification', 'Upskilling'],
    features: [
      'Agentic AI and LLM engineering bootcamps',
      'Data engineering and cloud architecture programmes',
      'Applied mathematics for AI and ML teams',
      'Bespoke corporate training and certification tracks',
    ],
  }),
  product({
    slug: 'rhema-press', name: 'Rhema Press', kicker: 'Publication & Knowledge Product',
    summary: 'Publication product for enterprise AI, data engineering, cloud architecture and applied mathematics books, white papers and practitioner playbooks.',
    tags: ['Publications', 'Books', 'White Papers', 'Knowledge'],
    features: [
      'Enterprise AI, data and cloud publication catalogue',
      'Books, white papers and practitioner playbooks',
      'Research-backed implementation guidance for leaders and builders',
      'Publication workflows connected to RhemaAI advisory and training',
    ],
    productUrl: '/publications',
  }),
]

const INDUSTRY_ACCENTS = {
  FinTech: '#10B981',
  Energy: '#F59E0B',
  Enterprise: '#6366F1',
  Retail: '#0EA5E9',
  Healthcare: '#F43F5E',
  Manufacturing: '#8B5CF6',
  'Data Engineering': '#06B6D4',
}

function caseStudy({ slug, industry, client, kpi1, kpi2, summary, tags }) {
  return {
    slug,
    title: client,
    industry,
    client,
    kpi1,
    kpi2,
    summary,
    tags,
    accent: INDUSTRY_ACCENTS[industry] || '#9B6DFF',
    published: true,
    publishedAt: new Date('2026-01-15'),
  }
}

const caseStudies = [
  caseStudy({ slug: 'fraud-fintech', industry: 'FinTech', client: 'West African Digital Bank', kpi1: { value: '94%', label: 'Fraud Recall' }, kpi2: { value: '<50ms', label: 'Inference Latency' }, summary: 'Streaming fraud detection pipeline with LightGBM and Graph Neural Networks on Azure, replacing a rule-based system that missed 40% of attacks.', tags: ['Kafka', 'LightGBM', 'Graph ML', 'Azure', 'FastAPI'] }),
  caseStudy({ slug: 'financial-intelligence-agent', industry: 'FinTech', client: 'Financial Intelligence Agent', kpi1: { value: '3-Way', label: 'Matching Automated' }, kpi2: { value: '100%', label: 'Budget Visibility' }, summary: 'Multi-agent financial operations system automating 3-way PO/GR/invoice matching, payment processing, budget monitoring, and rolling financial forecasting across the enterprise.', tags: ['LangGraph', 'FastAPI', 'Azure OpenAI', 'MCP', 'RAG'] }),
  caseStudy({ slug: 'agentic-payment-platform', industry: 'FinTech', client: 'Agentic Payment Platform', kpi1: { value: '7', label: 'Specialist Agents' }, kpi2: { value: 'On-Chain', label: 'Settlement Layer' }, summary: 'Blockchain-backed agentic payment platform with 7 coordinated agents handling transaction routing, fraud screening, compliance checks, reconciliation, and on-chain settlement.', tags: ['Blockchain', 'Solidity', 'LangGraph', 'Web3', 'FastAPI'] }),
  caseStudy({ slug: 'financial-news-intelligence-monitor', industry: 'FinTech', client: 'Financial News Intelligence Monitor', kpi1: { value: 'Real-Time', label: 'Signal Extraction' }, kpi2: { value: 'NLP', label: 'Sentiment Engine' }, summary: 'LLM-powered financial news monitoring system ingesting global feeds, extracting market signals, classifying sentiment, and delivering structured intelligence briefs to portfolio managers.', tags: ['GPT-4o', 'Kafka', 'NLP', 'RAG', 'Power BI'] }),
  caseStudy({ slug: 'compliance-risk-agent', industry: 'FinTech', client: 'Compliance & Risk Agent', kpi1: { value: 'KYC/AML', label: 'Automated Checks' }, kpi2: { value: 'Audit', label: 'Full Governance Trail' }, summary: 'Autonomous compliance and risk agent performing continuous KYC/AML screening, real-time risk monitoring, regulatory breach detection, mitigation recommendations, and audit-ready governance reporting.', tags: ['LangGraph', 'Azure OpenAI', 'KPCC', 'Risk ML', 'ISO 27001'] }),
  caseStudy({ slug: 'period-end-close-automation', industry: 'FinTech', client: 'Period-End Close Automation', kpi1: { value: 'Days to Hrs', label: 'Close Cycle Time' }, kpi2: { value: '100%', label: 'Cost Allocation Accuracy' }, summary: 'Agentic period-end close system automating journal entries, cost allocation, intercompany reconciliation, and project cost tracking, cutting the monthly close cycle from days to hours.', tags: ['LangGraph', 'SAP', 'Azure OpenAI', 'dbt', 'FastAPI'] }),
  caseStudy({ slug: 'predictive-energy', industry: 'Energy', client: 'Tier-1 Oil & Gas Operator', kpi1: { value: '34%', label: 'Downtime Reduction' }, kpi2: { value: '6hrs', label: 'Failure Lead Time' }, summary: 'IoT time-series forecasting deployed to edge devices at remote well sites, predicting equipment failure before it happened.', tags: ['Azure ML', 'IoT Edge', 'ONNX', 'Time-Series'] }),
  caseStudy({ slug: 'asset-maintenance-response-agent', industry: 'Energy', client: 'Asset & Maintenance Response Agent - Seplat Energy', kpi1: { value: 'Auto', label: 'Work Order Intelligence' }, kpi2: { value: 'Optimal', label: 'Spare Part Allocation' }, summary: 'Multi-agent asset management system automating predictive maintenance scheduling, spare part optimisation, work order prioritisation, and asset life cycle tracking across upstream oil and gas infrastructure.', tags: ['LangGraph', 'Azure ML', 'IoT', 'ONNX', 'FastAPI'] }),
  caseStudy({ slug: 'procurement-analytics-platform-seplat', industry: 'Energy', client: 'Procurement Analytics Platform - Seplat Energy', kpi1: { value: '360', label: 'Spend Visibility' }, kpi2: { value: 'T-SQL', label: 'SQL Server Engine' }, summary: 'Enterprise procurement intelligence platform on SQL Server with T-SQL views, KPI dashboards, supplier performance analytics, and spend category reporting, delivering full procurement visibility to the Seplat leadership team.', tags: ['SQL Server', 'T-SQL', 'Power BI', 'SSRS', 'Procurement'] }),
  caseStudy({ slug: 'scm-data-engineering-analytics-seplat', industry: 'Energy', client: 'SCM Data Engineering & Analytics - Seplat Energy', kpi1: { value: 'Unified', label: 'SCM Data Model' }, kpi2: { value: 'Real-Time', label: 'Supply Chain KPIs' }, summary: 'End-to-end supply chain data engineering and modelling platform, transforming fragmented SAP and legacy SCM data into a governed analytical layer with live dashboards for inventory, logistics, and vendor management.', tags: ['SAP', 'SQL Server', 'dbt', 'Power BI', 'DataOps'] }),
  caseStudy({ slug: 'sap-ecc-azure-synapse-seplat', industry: 'Energy', client: 'SAP ECC to Azure Synapse Migration - Seplat Energy', kpi1: { value: 'Zero', label: 'Data Loss' }, kpi2: { value: 'Full', label: 'Historical Lineage' }, summary: 'Full SAP ECC to Azure Synapse data migration and engineering project, including extraction pipeline design, data modelling, schema transformation, delta load engineering, and post-migration analytics validation.', tags: ['SAP ECC', 'Azure Synapse', 'ADF', 'dbt', 'Synapse Analytics'] }),
  caseStudy({ slug: 'azure-synapse-fabric-delta-lakehouse-seplat', industry: 'Energy', client: 'Azure Synapse Fabric - Delta Lakehouse - Seplat Energy', kpi1: { value: 'Delta', label: 'Lakehouse Architecture' }, kpi2: { value: '99.9%', label: 'Pipeline Observability' }, summary: 'Azure Synapse and Fabric-based Delta lakehouse and warehouse design with full observability, automated pipeline monitoring, and executive-grade reporting layers, replacing fragmented on-premises data stores at Seplat Energy.', tags: ['Azure Fabric', 'Synapse', 'Delta Lake', 'Spark', 'Power BI'] }),
  caseStudy({ slug: 'prism-ne-real-time-analytics-seplat', industry: 'Energy', client: 'Prism NE - Real-Time Analytics - Seplat Energy', kpi1: { value: 'Real-Time', label: 'Analytics Engine' }, kpi2: { value: 'Web', label: 'Segmentation Layer' }, summary: 'Near-real-time analytics platform built on Azure Synapse with web segmentation, operational reporting, and executive dashboards, replacing batch-only reporting cycles with live operational intelligence.', tags: ['Azure Synapse', 'Synapse Analytics', 'Power BI', 'Real-Time', 'Seplat'] }),
  caseStudy({ slug: 'market-intelligence-agent', industry: 'Energy', client: 'Intelligence & Insight Agent - Market Intelligence', kpi1: { value: 'Live', label: 'Market Intelligence' }, kpi2: { value: 'AI', label: 'Strategic Briefings' }, summary: 'Autonomous intelligence and insight agent continuously monitoring commodity markets, geopolitical signals, and competitor activity, delivering structured strategic briefings and decision-support outputs to executive stakeholders.', tags: ['GPT-4o', 'LangGraph', 'RAG', 'Kafka', 'NLP'] }),
  caseStudy({ slug: 'agentic-enterprise', industry: 'Enterprise', client: 'Global Professional Services Firm', kpi1: { value: '80%', label: 'Time-to-Process Cut' }, kpi2: { value: '12', label: 'Markets Deployed' }, summary: 'Multi-agent AI system on Azure AI Foundry automating document ingestion, classification, and extraction across 12 countries.', tags: ['Azure AI Foundry', 'LangGraph', 'GPT-4o', 'RAG'] }),
  caseStudy({ slug: 'ai-infrastructure-deployment-platform', industry: 'Enterprise', client: 'AI Infrastructure & Deployment Platform', kpi1: { value: 'Multi', label: 'Cloud Deployment' }, kpi2: { value: 'AKS/EKS', label: 'Container Orchestration' }, summary: 'Enterprise AI infrastructure and deployment platform across Azure, AWS, AKS, and EKS, providing the compute, container orchestration, and multi-agent system hosting layer for large-scale AI workloads.', tags: ['Azure', 'AWS', 'AKS', 'EKS', 'Terraform'] }),
  caseStudy({ slug: 'procurement-agentic-system', industry: 'Enterprise', client: 'Procurement Agentic System', kpi1: { value: '7', label: 'Specialist Agents' }, kpi2: { value: 'Policy', label: 'Governed Workflows' }, summary: '7-agent procurement orchestration system handling requisition-to-PO workflows, supplier validation, policy compliance, approval routing, and spend governance, reducing procurement cycle times and enforcing spend controls automatically.', tags: ['LangGraph', 'MCP', 'Azure OpenAI', 'SAP', 'Governance'] }),
  caseStudy({ slug: 'personalised-ai-assistant-enterprise', industry: 'Enterprise', client: 'Personalised AI Assistant - Enterprise', kpi1: { value: 'RAG', label: 'Enterprise Knowledge' }, kpi2: { value: 'Sedat', label: 'Seplat Deployment' }, summary: 'Personalised enterprise AI assistant built on RAG architecture with internal knowledge base integration, providing context-aware responses to employee queries across HR, procurement, and operational domains.', tags: ['RAG', 'GPT-4o', 'LangChain', 'Azure', 'FastAPI'] }),
  caseStudy({ slug: 'lma-platform-enterprise-ai', industry: 'Enterprise', client: 'LMA Platform - Enterprise AI', kpi1: { value: 'LLM', label: 'Management Layer' }, kpi2: { value: 'Unified', label: 'Model Access' }, summary: 'LLM Management and Access platform providing unified model routing, prompt management, usage tracking, cost controls, and multi-model orchestration across GPT-4o, Claude, and Llama deployments.', tags: ['LLMOps', 'GPT-4o', 'Claude', 'Llama', 'Azure'] }),
  caseStudy({ slug: 'lakehouse-retail', industry: 'Retail', client: 'Pan-African Retail Group', kpi1: { value: '3wks to 2hrs', label: 'Reporting Cycle' }, kpi2: { value: '5', label: 'ERPs Unified' }, summary: 'Medallion lakehouse on Azure Fabric with OneLake unifying five legacy ERPs into a single real-time analytics layer.', tags: ['Azure Fabric', 'OneLake', 'Spark', 'Power BI'] }),
  caseStudy({ slug: 'customer-segmentation-action-system', industry: 'Retail', client: 'Customer Segmentation Action System', kpi1: { value: '5', label: 'Specialist Agents' }, kpi2: { value: 'Real-Time', label: 'Segment Activation' }, summary: '5-agent customer segmentation and action system performing live behavioural analysis, cohort classification, personalised offer generation, and campaign activation, transforming passive segments into dynamic revenue actions.', tags: ['LangGraph', 'Spark', 'Azure ML', 'Kafka', 'FastAPI'] }),
  caseStudy({ slug: 'agentic-commerce-platform-tablibau', industry: 'Retail', client: 'Agentic Commerce Platform - Tablibau', kpi1: { value: 'Agentic', label: 'Commerce Flows' }, kpi2: { value: 'End-to-End', label: 'Order Automation' }, summary: 'Agentic commerce platform with AI agents handling product discovery, order placement, inventory validation, fulfilment routing, and post-purchase support, enabling fully automated commerce workflows.', tags: ['LangGraph', 'MCP', 'RAG', 'FastAPI', 'MERN'] }),
  caseStudy({ slug: 'predictive-analytics-bi-platform', industry: 'Retail', client: 'Predictive Analytics & BI Platform', kpi1: { value: 'Predictive', label: 'Demand Engine' }, kpi2: { value: 'Executive', label: 'Analytics Portal' }, summary: 'Enterprise predictive analytics and BI platform with demand forecasting, inventory optimisation models, and an executive analytics portal delivering actionable intelligence across retail operations.', tags: ['Azure ML', 'Power BI', 'Forecasting', 'dbt', 'Statistical ML'] }),
  caseStudy({ slug: 'mlops-healthcare', industry: 'Healthcare', client: 'Health Insurance Provider', kpi1: { value: '100%', label: 'Model Observability' }, kpi2: { value: '4x', label: 'Deploy Frequency' }, summary: 'End-to-end MLOps platform with drift detection, MLflow model registry, and GitHub Actions CI/CD, replacing fully manual deployments.', tags: ['Azure ML', 'MLflow', 'Evidently', 'Terraform'] }),
  caseStudy({ slug: 'surgical-tool-detection-system', industry: 'Healthcare', client: 'Surgical Tool Detection System', kpi1: { value: 'Real-Time', label: 'Vision Detection' }, kpi2: { value: 'Edge', label: 'Deployed Model' }, summary: 'Computer vision system for real-time surgical tool detection and tracking in operating theatre environments, deployed on edge hardware with sub-100ms inference for intraoperative safety and instrument accountability.', tags: ['YOLOv8', 'ONNX', 'Edge AI', 'TF Lite', 'FastAPI'] }),
  caseStudy({ slug: 'cloud-manufacturing', industry: 'Manufacturing', client: 'Industrial Manufacturer', kpi1: { value: '41%', label: 'Cost Saved' }, kpi2: { value: '99.99%', label: 'Post-Migration Uptime' }, summary: 'Phased migration to Azure using Bicep IaC with zero-downtime cutover, replacing on-premises infrastructure that blocked digital transformation.', tags: ['Azure', 'Bicep', 'IaC', 'DevOps'] }),
  caseStudy({ slug: 'tensor-split-ai-design-agent', industry: 'Manufacturing', client: 'Tensor Split - AI Design Agent', kpi1: { value: 'AI', label: 'Design Automation' }, kpi2: { value: 'Split', label: 'Parallel Processing' }, summary: 'AI design agent using tensor-split parallel processing to automate engineering design validation, tolerance analysis, and manufacturing specification generation, reducing design review cycles in precision manufacturing.', tags: ['PyTorch', 'ONNX', 'FastAPI', 'Azure ML', 'Agentic AI'] }),
  caseStudy({ slug: 'elitem-prep-blockchain-supply-chain', industry: 'Manufacturing', client: 'Elitem Prep - Blockchain Supply Chain', kpi1: { value: '4', label: 'Agent Coordination' }, kpi2: { value: 'On-Chain', label: 'Provenance Tracking' }, summary: 'Blockchain-backed supply chain provenance system with 4 coordinated agents managing material certification, supplier verification, chain-of-custody tracking, and on-chain compliance attestation for regulated manufacturing.', tags: ['Blockchain', 'Solidity', 'LangGraph', 'Web3', 'IPFS'] }),
  caseStudy({ slug: 'rhemaai-platform-website-seo', industry: 'Data Engineering', client: 'RhemaAI Platform - Website & SEO', kpi1: { value: '100%', label: 'Lighthouse SEO Score' }, kpi2: { value: 'Indexed', label: 'By Google' }, summary: 'Full MERN stack web application for RhemaAI Solutions deployed with 100% Lighthouse SEO score, Google indexing, optimised Core Web Vitals, and integrated reporting and visualisation dashboards.', tags: ['MERN', 'SEO', 'Lighthouse', 'Hostinger KVM', 'Stripe'] }),
  caseStudy({ slug: 'adso-azure-synapse-migration-seplat', industry: 'Data Engineering', client: 'ADSO to Azure Synapse Migration - Seplat', kpi1: { value: 'Full', label: 'Data Migration' }, kpi2: { value: 'Zero', label: 'Business Disruption' }, summary: 'Migration of SAP ADSO structures to Azure Synapse with full data fidelity, schema translation, delta load engineering, and post-migration validation, enabling cloud-native analytics on previously locked SAP data.', tags: ['SAP ADSO', 'Azure Synapse', 'ADF', 'Spark', 'Data Migration'] }),
  caseStudy({ slug: 'predictive-analytics-data-engine', industry: 'Data Engineering', client: 'Predictive Analytics Data Engine', kpi1: { value: 'ML', label: 'Modelling Layer' }, kpi2: { value: 'Unified', label: 'Analytics Platform' }, summary: 'Enterprise predictive analytics data engine combining feature engineering, ML modelling, and an analytics portal, providing a reusable accelerator for deploying predictive intelligence across multiple business domains.', tags: ['Azure ML', 'dbt', 'Spark', 'MLflow', 'Power BI'] }),
]

async function seed() {
  try {
    await connectDB()
    console.log('🌱 Connected to database. Starting seed...')

    await Insight.deleteMany({})
    await Subscriber.deleteMany({})
    await Contact.deleteMany({})
    console.log('🗑  Cleared existing data')

    await Insight.insertMany(insights)
    console.log(`✅ Seeded ${insights.length} insights`)

    await Subscriber.insertMany(subscribers)
    console.log(`✅ Seeded ${subscribers.length} subscribers`)

    await Contact.insertMany(contacts)
    console.log(`✅ Seeded ${contacts.length} contacts`)

    await Promise.all(publications.map((publication) => (
      Publication.updateOne(
        { slug: publication.slug },
        { $setOnInsert: publication },
        { upsert: true }
      )
    )))
    console.log(`Verified ${publications.length} publication`)

    await Promise.all(products.map((item) => (
      Product.updateOne(
        { slug: item.slug },
        { $setOnInsert: item },
        { upsert: true }
      )
    )))
    console.log(`Verified ${products.length} products`)

    await Promise.all(caseStudies.map((item) => (
      CaseStudy.updateOne(
        { slug: item.slug },
        { $setOnInsert: item },
        { upsert: true }
      )
    )))
    console.log(`Verified ${caseStudies.length} case studies`)

    console.log('🎉 Seed complete!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  }
}

seed()
