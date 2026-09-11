// Approved public starting prices from the owner?s v2 pricing reference.
// Nigerian and international amounts are independent price lists; no currency conversion.
export const PRODUCT_PRICING = {
  "nexus-aos": {
    "amountNGN": 7500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Readiness Assessment",
        "amountNGN": 2500000,
        "prefix": "From",
        "amount": 3500,
        "currency": "USD",
        "id": "readiness-assessment"
      },
      {
        "name": "Architecture Blueprint",
        "amountNGN": 3500000,
        "prefix": "From",
        "amount": 8000,
        "currency": "USD",
        "id": "architecture-blueprint"
      },
      {
        "name": "Proof of Concept",
        "amountNGN": 7500000,
        "prefix": "From",
        "amount": 20000,
        "currency": "USD",
        "id": "standard-pilot"
      },
      {
        "name": "Production Deployment",
        "amountNGN": 20000000,
        "prefix": "From",
        "amount": 50000,
        "currency": "USD",
        "id": "implementation-services"
      },
      {
        "name": "Enterprise Deployment",
        "amountNGN": 60000000,
        "prefix": "From",
        "amount": 150000,
        "currency": "USD",
        "id": "enterprise"
      },
      {
        "name": "Professional AgentOps",
        "amountNGN": 5000000,
        "prefix": "From",
        "amount": 15000,
        "currency": "USD",
        "interval": "month",
        "id": "managed-services"
      },
      {
        "name": "Enterprise AgentOps",
        "amountNGN": 10000000,
        "prefix": "From",
        "amount": 30000,
        "currency": "USD",
        "interval": "month",
        "id": "enterprise-agentops"
      },
      {
        "name": "24/7 Mission-Critical AgentOps",
        "amountNGN": 20000000,
        "prefix": "From",
        "amount": 50000,
        "currency": "USD",
        "interval": "month",
        "id": "mission-critical-agentops"
      }
    ]
  },
  "apex-rag": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Knowledge Readiness Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "RAG Proof of Concept",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Deployment",
        "amountNGN": 18000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Knowledge Platform",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 45000000,
        "amount": 90000,
        "id": "enterprise"
      },
      {
        "name": "Managed RAG Operations",
        "amountNGN": 4000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "lyra-nlp": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Document and Language Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Document Intelligence PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Deployment",
        "amountNGN": 18000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Multilingual Deployment",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 40000000,
        "amount": 75000,
        "id": "enterprise"
      },
      {
        "name": "Managed NLP Operations",
        "amountNGN": 4000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "aura-xai": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Model Explainability Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Interpretability PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Deployment",
        "amountNGN": 15000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Regulated Enterprise Deployment",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 35000000,
        "amount": 60000,
        "id": "enterprise"
      },
      {
        "name": "Continuous Model Assurance",
        "amountNGN": 3500000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "vega-oas": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Optimisation Opportunity Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Optimisation PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Decision System",
        "amountNGN": 18000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Optimisation Platform",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 40000000,
        "amount": 75000,
        "id": "enterprise"
      },
      {
        "name": "Managed Optimisation",
        "amountNGN": 4000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "prism-bi": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "BI and KPI Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Executive Dashboard PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production BI Platform",
        "amountNGN": 15000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Analytics Deployment",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 30000000,
        "amount": 50000,
        "id": "enterprise"
      },
      {
        "name": "Managed BI Operations",
        "amountNGN": 3000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "orbit-cx": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Customer Data Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Segmentation and Churn PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Customer Platform",
        "amountNGN": 15000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Personalisation Platform",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 35000000,
        "amount": 60000,
        "id": "enterprise"
      },
      {
        "name": "Managed Customer Intelligence",
        "amountNGN": 3000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "stratum-dx": {
    "amountNGN": 8000000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Data Platform Assessment",
        "amountNGN": 2000000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Lakehouse PoC",
        "amountNGN": 8000000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Data Platform",
        "amountNGN": 25000000,
        "amount": 60000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Data Modernisation",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 75000000,
        "amount": 150000,
        "id": "enterprise"
      },
      {
        "name": "Managed Data Platform",
        "amountNGN": 6000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "flux-cdc": {
    "amountNGN": 7000000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Streaming Readiness Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "CDC Pipeline PoC",
        "amountNGN": 7000000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Streaming Platform",
        "amountNGN": 22000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Event Architecture",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 60000000,
        "amount": 100000,
        "id": "enterprise"
      },
      {
        "name": "Managed Streaming Operations",
        "amountNGN": 5000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "meridian-dq": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Data Quality Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Data Observability PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Deployment",
        "amountNGN": 18000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Data Trust Programme",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 40000000,
        "amount": 75000,
        "id": "enterprise"
      },
      {
        "name": "Managed Data Quality",
        "amountNGN": 4000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "corda-fs": {
    "amountNGN": 7000000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Feature Readiness Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Feature Store PoC",
        "amountNGN": 7000000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Feature Platform",
        "amountNGN": 20000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise ML Data Platform",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 50000000,
        "amount": 90000,
        "id": "enterprise"
      },
      {
        "name": "Managed Feature Operations",
        "amountNGN": 4500000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "helix-lz": {
    "amountNGN": 8000000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Cloud Readiness Assessment",
        "amountNGN": 2000000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Landing-Zone Foundation",
        "amountNGN": 8000000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Cloud Landing Zone",
        "amountNGN": 25000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Multicloud Enterprise Deployment",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 60000000,
        "amount": 100000,
        "id": "enterprise"
      },
      {
        "name": "Managed Cloud Governance",
        "amountNGN": 5000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "krato-ml": {
    "amountNGN": 7000000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "MLOps Maturity Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "MLOps PoC",
        "amountNGN": 7000000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production MLOps Platform",
        "amountNGN": 22000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise ML Operating Model",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 60000000,
        "amount": 100000,
        "id": "enterprise"
      },
      {
        "name": "Managed MLOps",
        "amountNGN": 5000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "cipher-gx": {
    "amountNGN": 8000000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Security Posture Assessment",
        "amountNGN": 2000000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Security Controls Pilot",
        "amountNGN": 8000000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Security Platform",
        "amountNGN": 25000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Security Programme",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 60000000,
        "amount": 100000,
        "id": "enterprise"
      },
      {
        "name": "Managed Security Governance",
        "amountNGN": 6000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "axiom-qr": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Engagements start from",
    "tiers": [
      {
        "name": "Research Scoping Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Quantitative Research Pilot",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Full Research Engagement",
        "amountNGN": 15000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Institutional Research Programme",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 25000000,
        "amount": 50000,
        "id": "enterprise"
      },
      {
        "name": "Research Advisory Retainer",
        "amountNGN": 2500000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "ledger-fm": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Financial Model Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Risk or Pricing Model PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Quantitative System",
        "amountNGN": 18000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Institutional Risk Platform",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 40000000,
        "amount": 75000,
        "id": "enterprise"
      },
      {
        "name": "Managed Model Support",
        "amountNGN": 4000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "sigma-im": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Engagements start from",
    "tiers": [
      {
        "name": "Modelling Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Simulation PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Simulation System",
        "amountNGN": 15000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Industrial Programme",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 35000000,
        "amount": 60000,
        "id": "enterprise"
      },
      {
        "name": "Managed Modelling Support",
        "amountNGN": 3000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "volta-ei": {
    "amountNGN": 8000000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Edge and IoT Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Edge-AI PoC",
        "amountNGN": 8000000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Edge Deployment",
        "amountNGN": 25000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Industrial Enterprise Deployment",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 60000000,
        "amount": 100000,
        "id": "enterprise"
      },
      {
        "name": "Managed Edge Operations",
        "amountNGN": 5000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  },
  "forge-se": {
    "amountNGN": 6500000,
    "amount": 20000,
    "currency": "USD",
    "prefix": "From",
    "basis": "Deployments start from",
    "tiers": [
      {
        "name": "Software Architecture Assessment",
        "amountNGN": 1500000,
        "amount": 3500,
        "currency": "USD",
        "prefix": "From",
        "id": "assessment"
      },
      {
        "name": "Application or API PoC",
        "amountNGN": 6500000,
        "amount": 20000,
        "currency": "USD",
        "prefix": "From",
        "id": "proof-of-concept"
      },
      {
        "name": "Production Application",
        "amountNGN": 18000000,
        "amount": 50000,
        "currency": "USD",
        "prefix": "From",
        "id": "production"
      },
      {
        "name": "Enterprise Software Platform",
        "prefix": "From",
        "currency": "USD",
        "amountNGN": 45000000,
        "amount": 75000,
        "id": "enterprise"
      },
      {
        "name": "Managed Application Support",
        "amountNGN": 4000000,
        "amount": 15000,
        "currency": "USD",
        "prefix": "From",
        "interval": "month",
        "id": "managed-operations"
      }
    ]
  }
}

export const SERVICE_PRICING = {
  "agentic-ai": {
    "amountNGN": 7500000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 7500000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 20000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 5000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 75000
      }
    ]
  },
  "generative-ai": {
    "amountNGN": 6000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 6000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 18000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 4000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 60000
      }
    ]
  },
  "data-engineering": {
    "amountNGN": 8000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 8000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 25000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 6000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 100000
      }
    ]
  },
  "data-science": {
    "amountNGN": 5000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 5000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 15000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 3000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 40000
      }
    ]
  },
  "cloud-architecture": {
    "amountNGN": 7500000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 7500000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 25000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 5000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 75000
      }
    ]
  },
  "mlops": {
    "amountNGN": 7000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 7000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 22000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 5000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 75000
      }
    ]
  },
  "azure-monitoring": {
    "amountNGN": 3000000,
    "prefix": "From",
    "basis": "Initial setup",
    "tiers": [
      {
        "name": "Initial setup",
        "amountNGN": 3000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 10000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 3000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 15000
      }
    ]
  },
  "ai-workload-management": {
    "amountNGN": 4000000,
    "prefix": "From",
    "basis": "Initial setup",
    "tiers": [
      {
        "name": "Initial setup",
        "amountNGN": 4000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 12000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 4000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 20000
      }
    ]
  },
  "data-platform-ops": {
    "amountNGN": 4000000,
    "prefix": "From",
    "basis": "Initial setup",
    "tiers": [
      {
        "name": "Initial setup",
        "amountNGN": 4000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 12000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 4000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 20000
      }
    ]
  },
  "security-compliance-support": {
    "amountNGN": 2000000,
    "prefix": "From",
    "basis": "Assessment",
    "tiers": [
      {
        "name": "Assessment",
        "amountNGN": 2000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 25000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 6000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 50000
      }
    ]
  },
  "cost-optimisation": {
    "amountNGN": 1500000,
    "prefix": "From",
    "basis": "Assessment",
    "tiers": [
      {
        "name": "Assessment",
        "amountNGN": 1500000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 6000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 2500000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 15000
      }
    ]
  },
  "application-support": {
    "amountNGN": 1500000,
    "prefix": "From",
    "basis": "Onboarding",
    "tiers": [
      {
        "name": "Onboarding",
        "amountNGN": 1500000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 2500000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 5000,
        "interval": "month"
      }
    ]
  },
  "cloud-finops": {
    "amountNGN": 1500000,
    "prefix": "From",
    "basis": "Assessment",
    "tiers": [
      {
        "name": "Assessment",
        "amountNGN": 1500000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 8000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 3000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 20000
      }
    ]
  },
  "ai-advisory": {
    "amountNGN": 2500000,
    "prefix": "From",
    "basis": "Architecture / roadmap",
    "tiers": [
      {
        "name": "Architecture / roadmap",
        "amountNGN": 2500000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 12000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 3000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 25000
      }
    ]
  },
  "software-engineering": {
    "amountNGN": 6000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 6000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 20000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 4000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 75000
      }
    ]
  },
  "fintech-blockchain": {
    "amountNGN": 8000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 8000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 25000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 6000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 100000
      }
    ]
  },
  "digital-marketing": {
    "amountNGN": 1500000,
    "prefix": "From",
    "basis": "Strategy",
    "tiers": [
      {
        "name": "Strategy",
        "amountNGN": 1500000,
        "prefix": "From"
      },
      {
        "name": "Campaign delivery",
        "amountNGN": 3000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 1200000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 3000,
        "interval": "month"
      }
    ]
  },
  "cybersecurity": {
    "amountNGN": 2000000,
    "prefix": "From",
    "basis": "Assessment",
    "tiers": [
      {
        "name": "Assessment",
        "amountNGN": 2000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 25000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 6000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 50000
      }
    ]
  },
  "statistical-analysis": {
    "amountNGN": 1200000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 1200000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 5000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 2500000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 8000
      }
    ]
  },
  "industrial-mathematics": {
    "amountNGN": 2500000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 2500000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 10000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 3000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 20000
      }
    ]
  },
  "financial-mathematics": {
    "amountNGN": 3000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 3000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 15000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 4000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 40000
      }
    ]
  },
  "explainable-ai": {
    "amountNGN": 5000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 5000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 15000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 4000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 50000
      }
    ]
  },
  "nlp-document-intelligence": {
    "amountNGN": 6000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 6000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 18000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 4000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 60000
      }
    ]
  },
  "technical-training": {
    "amountNGN": 1200000,
    "prefix": "From",
    "interval": "session",
    "basis": "Training session",
    "tiers": [
      {
        "name": "Training session",
        "amountNGN": 1200000,
        "prefix": "From",
        "interval": "session"
      },
      {
        "name": "Training programme",
        "amountNGN": 5000000,
        "prefix": "From",
        "interval": "programme"
      },
      {
        "name": "Managed service",
        "amountNGN": 2500000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 8000,
        "interval": "programme"
      }
    ]
  },
  "quantitative-research": {
    "amountNGN": 2500000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 2500000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 10000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 3000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 20000
      }
    ]
  },
  "iot-edge-ai": {
    "amountNGN": 8000000,
    "prefix": "From",
    "basis": "Initial engagement",
    "tiers": [
      {
        "name": "Initial engagement",
        "amountNGN": 8000000,
        "prefix": "From"
      },
      {
        "name": "Production project",
        "amountNGN": 25000000,
        "prefix": "From"
      },
      {
        "name": "Managed service",
        "amountNGN": 5000000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "International enterprise engagement",
        "prefix": "From",
        "currency": "USD",
        "amount": 100000
      }
    ]
  },
  "managed-services": {
    "amountNGN": 2500000,
    "prefix": "From",
    "interval": "month",
    "basis": "Managed-service packages",
    "tiers": [
      {
        "name": "Essential",
        "amountNGN": 2500000,
        "prefix": "From",
        "interval": "month"
      },
      {
        "name": "Professional",
        "amountNGN": 5000000,
        "prefix": "From",
        "amount": 15000,
        "currency": "USD",
        "interval": "month"
      },
      {
        "name": "Enterprise",
        "amountNGN": 10000000,
        "prefix": "From",
        "amount": 30000,
        "currency": "USD",
        "interval": "month"
      },
      {
        "name": "Mission Critical",
        "amountNGN": 20000000,
        "prefix": "From",
        "amount": 40000,
        "currency": "USD",
        "interval": "month"
      }
    ]
  }
}
