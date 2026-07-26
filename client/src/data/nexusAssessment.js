const SCALE_LABELS = [
  'Not established',
  'Initial and inconsistent',
  'Defined for selected work',
  'Operational and measured',
  'Continuously governed and improved',
]

const DIMENSIONS = [
  ['business-strategy', 'Business strategy', ['Executive ownership for agentic AI is clear.', 'Expected business outcomes are explicit and measurable.', 'Investment decisions connect AI initiatives to operating priorities.'], ['Executive sponsor', 'Prioritised outcomes', 'Funding pathway', 'Value measurement']],
  ['use-case-clarity', 'Use-case clarity', ['Priority workflows have clear boundaries and owners.', 'Decision points and exceptions are understood.', 'Success and stop criteria are documented.'], ['Named workflow owner', 'Baseline performance', 'Exception map', 'Pilot acceptance criteria']],
  ['process-maturity', 'Process maturity', ['The target process is documented end to end.', 'Roles and hand-offs are consistently followed.', 'Operational changes are governed and reviewed.'], ['Process map', 'Role ownership', 'Change control', 'Operational runbook']],
  ['data-readiness', 'Data readiness', ['Required data sources are known and accessible.', 'Data quality is measured for the target workflow.', 'Lineage, retention and ownership are defined.'], ['Data owners', 'Quality controls', 'Lineage', 'Retention rules']],
  ['integration-readiness', 'Integration readiness', ['Required systems expose stable integration paths.', 'Tool permissions can be limited by role and action.', 'Integration failures are observable and recoverable.'], ['API or event access', 'Sandbox environments', 'Service identities', 'Integration monitoring']],
  ['ai-model-maturity', 'AI and model maturity', ['Teams have evaluated models against real tasks.', 'Model limitations and fallback behaviour are documented.', 'Model changes follow controlled release practices.'], ['Evaluation dataset', 'Model registry', 'Release gates', 'Fallback model or process']],
  ['security', 'Security', ['Identity and least-privilege requirements are defined.', 'Secrets and sensitive data have approved handling controls.', 'Threat modelling includes agent and tool misuse.'], ['Role-based access', 'Secret management', 'Threat model', 'Security monitoring']],
  ['governance-compliance', 'Governance and compliance', ['Policies identify actions that agents may and may not perform.', 'Risk classifications drive approval requirements.', 'Decision evidence can support audit or regulatory review.'], ['AI policy', 'Risk classification', 'Approval matrix', 'Audit evidence standard']],
  ['human-oversight', 'Human oversight', ['Accountable people are assigned to material decisions.', 'Approval requests include enough evidence and context.', 'Escalations have service ownership and response paths.'], ['Approval owners', 'Escalation paths', 'Override controls', 'Decision evidence']],
  ['operational-observability', 'Operational observability', ['Workflow and agent state can be traced end to end.', 'Failures, latency and model cost are monitored.', 'Business outcomes are connected to technical telemetry.'], ['Distributed traces', 'Failure taxonomy', 'Cost telemetry', 'Outcome dashboards']],
  ['infrastructure-deployment', 'Infrastructure and deployment', ['A preferred deployment boundary has been identified.', 'Environment promotion and rollback practices are defined.', 'Capacity, resilience and data residency needs are understood.'], ['Target environment', 'CI/CD controls', 'Resilience requirements', 'Data residency decision']],
  ['organisational-capability', 'Organisational capability', ['Teams have the architecture and engineering skills to own the workflow.', 'Business, risk and technical roles collaborate effectively.', 'Training and operating-model changes are planned.'], ['Product owner', 'AI or data architect', 'Risk partner', 'Enablement plan']],
]

export const ASSESSMENT_DIMENSIONS = DIMENSIONS.map(([slug, name]) => ({ slug, name }))

export const ASSESSMENT_QUESTIONS = DIMENSIONS.flatMap(([dimension, name, statements, practices]) => [
  ...statements.map((prompt, index) => ({
    id: `${dimension}-${index + 1}`,
    dimension,
    dimensionName: name,
    type: 'scale',
    prompt,
    options: SCALE_LABELS.map((label, optionIndex) => ({ label, value: optionIndex + 1 })),
  })),
  {
    id: `${dimension}-4`,
    dimension,
    dimensionName: name,
    type: 'multi',
    prompt: `Which ${name.toLowerCase()} foundations are already in place?`,
    options: practices.map((label) => ({ label, value: label })),
  },
])

export const MATURITY_BANDS = [
  { min: 0, max: 24, name: 'Foundation Required', engagement: 'Nexus AI Readiness Assessment', action: 'Establish ownership, workflow clarity and minimum governance foundations before selecting a pilot.' },
  { min: 25, max: 49, name: 'Emerging', engagement: 'Nexus Workflow Discovery', action: 'Prioritise one bounded workflow and close the most material data, integration and oversight gaps.' },
  { min: 50, max: 69, name: 'Pilot Ready', engagement: 'Nexus Standard Pilot', action: 'Define a controlled pilot with explicit policy gates, human approvals and an evaluation baseline.' },
  { min: 70, max: 84, name: 'Scale Ready', engagement: 'Nexus Standard Pilot with scale roadmap', action: 'Validate one workflow in production-oriented conditions, then extend reusable governance and integration patterns.' },
  { min: 85, max: 100, name: 'Advanced', engagement: 'Nexus Enterprise', action: 'Prioritise a portfolio of governed workflows and formalise the cross-domain operating model.' },
]
