import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Insight from '../models/Insight.js'
import { Subscriber } from '../models/Subscriber.js'
import Contact from '../models/Contact.js'

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
    author: { name: 'RhemaAI Team' },
    seo: {
      metaTitle: 'Building Agentic AI Systems at Enterprise Scale | RhemaAI',
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
    author: { name: 'RhemaAI Team' },
    seo: {
      metaTitle: 'Modern Data Lakehouse Architecture on Azure Fabric | RhemaAI',
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
    author: { name: 'RhemaAI Team' },
    seo: {
      metaTitle: 'Predictive Analytics for Energy Sector Case Study | RhemaAI',
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
    author: { name: 'RhemaAI Team' },
    seo: {
      metaTitle: 'MLOps Best Practices with Azure ML and GitHub Actions | RhemaAI',
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
    author: { name: 'RhemaAI Team' },
    seo: {
      metaTitle: 'AI Fraud Detection in FinTech Architecture Guide | RhemaAI',
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
    author: { name: 'RhemaAI Team' },
    seo: {
      metaTitle: 'Enterprise AI Transformation: A 90-Day Roadmap | RhemaAI',
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

    console.log('🎉 Seed complete!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  }
}

seed()
