export const NEXUS_BASE = '/products/nexus-aos'

export const NEXUS_NAV_ITEMS = [
  { label: 'Overview', path: NEXUS_BASE },
  { label: 'Solutions', path: `${NEXUS_BASE}/solutions` },
  { label: 'Architecture', path: `${NEXUS_BASE}/architecture` },
  { label: 'Assessment', path: `${NEXUS_BASE}/readiness-assessment` },
  { label: 'Pricing', path: `${NEXUS_BASE}/pricing` },
  { label: 'Documentation', path: `${NEXUS_BASE}/docs` },
  { label: 'Request Demo', path: `${NEXUS_BASE}/demo`, primary: true },
]

export const NEXUS_CAPABILITIES = [
  ['Multi-agent orchestration', 'Coordinate specialist agents, responsibilities and controlled collaboration patterns.'],
  ['Goal and workflow management', 'Translate approved outcomes into durable tasks, checkpoints and workflow state.'],
  ['Enterprise memory and knowledge', 'Ground work in governed context, retrieval and operational memory boundaries.'],
  ['Tool and system integration', 'Connect permitted APIs, data platforms and enterprise applications through controlled interfaces.'],
  ['Policy and governance enforcement', 'Evaluate identity, risk, authority and policy before tools or actions are invoked.'],
  ['Human-in-the-loop operations', 'Route exceptions and material decisions to accountable people with evidence and context.'],
  ['Evaluation and observability', 'Trace agent activity, outcomes, latency, cost, failures and human interventions.'],
  ['Failure recovery and compensation', 'Apply retries, checkpoints, suspension and business compensation where appropriate.'],
  ['Domain-specific configuration', 'Configure agent roles and workflows around real operating responsibilities.'],
  ['Secure deployment and access control', 'Support enterprise identity, least privilege, data boundaries and dedicated deployment options.'],
]

export const CADABA_LAYERS = [
  'Experience and Access Layer',
  'Agent Orchestration Layer',
  'Goal, Planning and Decision Layer',
  'Specialist Agent Network',
  'Context, Memory and Knowledge Layer',
  'Policy, Governance and Human Oversight',
  'Enterprise Tools, Data and Applications',
  'Evaluation, Learning and Observability',
]

export const FLAGSHIP_SOLUTIONS = {
  'agentic-data-engineering': {
    eyebrow: 'Flagship solution · Data engineering',
    title: 'Operate Data Platforms with Governed AI Agents',
    description: 'Nexus AOS coordinates configurable agent roles across the data-engineering lifecycle while retaining policy controls, auditability, approvals and human accountability.',
    problems: ['Pipeline failures', 'Delayed incident detection', 'Data-quality degradation', 'Schema drift', 'Broken dependencies', 'Metadata inconsistency', 'Cost overruns', 'Slow root-cause analysis', 'Manual operational runbooks', 'Disconnected monitoring systems', 'Poor lineage visibility', 'Unsafe automated remediation'],
    agents: ['Data Pipeline Observer', 'Data Quality Agent', 'Metadata and Lineage Agent', 'Schema Change Agent', 'Incident Triage Agent', 'Root Cause Analysis Agent', 'Cost Optimisation Agent', 'Security and Policy Agent', 'Remediation Planner', 'Human Approval Coordinator', 'Audit and Evidence Agent'],
    workflow: ['Pipeline anomaly detected', 'Observer gathers telemetry', 'Data Quality Agent validates impact', 'Metadata Agent identifies affected assets', 'Root Cause Agent produces evidence-backed hypotheses', 'Policy Agent determines permitted actions', 'Human approval requested where required', 'Remediation executed or escalated', 'Outcome recorded and monitored'],
    integrations: ['Microsoft Fabric', 'Azure Data Factory', 'Azure Synapse Analytics', 'Databricks', 'Apache Spark', 'Apache Airflow', 'Kafka', 'dbt', 'Data lakes and warehouses', 'Metadata and observability platforms'],
    integrationNote: 'These are architecture examples for enterprise implementation, not a claim that every connector is generally available out of the box.',
    ctas: [
      ['Request a Data Engineering Demo', `${NEXUS_BASE}/demo?domain=data-engineering`],
      ['Start a Pipeline Operations Pilot', `${NEXUS_BASE}/demo?interest=standard-pilot&domain=data-engineering`],
      ['Complete the Readiness Assessment', `${NEXUS_BASE}/readiness-assessment`],
    ],
  },
  procurement: {
    eyebrow: 'Flagship solution · Supply chain',
    title: 'Coordinate Procurement Decisions Across Agents, Systems and Human Approvals',
    description: 'Nexus AOS structures multi-step procurement work around evidence, delegated authority, policy gates and accountable human approvals.',
    problems: ['Fragmented supplier information', 'Slow sourcing research', 'Compliance screening', 'Approval bottlenecks', 'Purchase-order exceptions', 'Contract and policy checks', 'Poor auditability', 'Supplier risk', 'Disconnected ERP workflows', 'Failed multi-step transactions'],
    agents: ['Intake Agent', 'Supplier Research Agent', 'Vendor Data Agent', 'Sanctions and Compliance Agent', 'Risk Assessment Agent', 'Pricing and Comparison Agent', 'Contract Review Agent', 'Purchase Order Agent', 'Approval Coordinator', 'Exception Management Agent', 'Notification Agent', 'Audit Evidence Agent'],
    workflow: ['Purchase request received', 'Requirements normalised', 'Supplier candidates researched', 'Compliance and risk checks performed', 'Commercial options compared', 'Human approval obtained', 'Purchase order created', 'Downstream checks continue', 'Failure triggers suspension, compensation or escalation', 'Full decision trail retained'],
    integrations: ['ERP', 'Procurement systems', 'Supplier databases', 'Contract repositories', 'Sanctions data', 'Email and collaboration tools', 'Identity systems', 'Finance and payment workflows'],
    integrationNote: 'Integration categories describe the target enterprise architecture. Connector scope is confirmed during discovery.',
    recovery: [
      ['Technical rollback', 'Reverse a technically reversible system change.'],
      ['Business compensation', 'Create a balancing business action when a completed step cannot simply be undone.'],
      ['Human escalation', 'Transfer authority and evidence to an accountable decision-maker.'],
      ['Workflow suspension', 'Pause downstream action while preserving durable state and context.'],
    ],
    ctas: [
      ['Request a Procurement Demo', `${NEXUS_BASE}/demo?domain=procurement`],
      ['Discuss a Procurement Pilot', `${NEXUS_BASE}/demo?interest=standard-pilot&domain=procurement`],
      ['View Nexus Architecture', `${NEXUS_BASE}/architecture`],
    ],
  },
}

export const ARCHITECTURE_LAYERS = [
  'Experience and Access',
  'API and Integration Gateway',
  'Nexus Agent Orchestrator',
  'Goal and Planning Services',
  'Specialist Agent Services',
  'Context and Memory',
  'Enterprise Knowledge and Retrieval',
  'Policy and Governance',
  'Human Approval and Escalation',
  'Tool and Action Execution',
  'Event and Workflow State',
  'Evaluation and Observability',
  'Security and Identity',
  'Data and Platform Integration',
]

export const CADABA_LOOP = [
  'Perceive',
  'Understand context',
  'Establish or refine goals',
  'Plan',
  'Select agents and tools',
  'Execute controlled actions',
  'Evaluate outcomes',
  'Escalate when required',
  'Update memory and operational state',
]
