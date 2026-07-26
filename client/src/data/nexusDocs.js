const updated = '2026-07-26'

export const NEXUS_DOC_SECTIONS = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    summary: 'Understand the Nexus AOS evaluation pathway, intended users and the lifecycle of a governed agentic workflow.',
    updated,
    groups: [
      {
        heading: 'What Nexus AOS is',
        body: [
          'Nexus AOS is RhemaAI Solutions Ltd’s enterprise platform for designing, orchestrating, governing and observing multi-agent workflows.',
          'It is intended for organisations that need specialised AI agents to work across enterprise knowledge, tools and processes without removing human accountability or policy controls.',
        ],
      },
      {
        heading: 'Intended users',
        items: ['Enterprise and solution architects', 'AI, data and platform engineering teams', 'Risk, security and governance leaders', 'Workflow and operations owners', 'Approved integration partners'],
      },
      {
        heading: 'Evaluation lifecycle',
        items: ['Identify one bounded workflow and accountable owner', 'Assess value, data, integration and governance readiness', 'Define agent roles, tools, permissions and approval gates', 'Implement a controlled pilot with evaluation criteria', 'Review evidence and decide whether to stop, refine or scale'],
      },
      {
        heading: 'Access',
        body: ['Public documentation explains the platform model. Sandbox, implementation and detailed technical access are provided to approved pilot and enterprise participants.'],
      },
    ],
  },
  {
    slug: 'concepts',
    title: 'Core Concepts',
    summary: 'The vocabulary used to describe governed agentic workflows in Nexus AOS.',
    updated,
    groups: [
      {
        heading: 'Work and responsibility',
        definitions: [
          ['Agent', 'A bounded software participant configured to perform a defined role using permitted models, knowledge and tools.'],
          ['Agent role', 'The responsibilities, authority, inputs, outputs and escalation obligations assigned to an agent.'],
          ['Goal', 'An approved outcome with context, constraints and success criteria.'],
          ['Task', 'A discrete unit of work within a goal or workflow.'],
          ['Workflow', 'A durable sequence or graph of tasks, decisions, approvals and recovery paths.'],
        ],
      },
      {
        heading: 'Control and context',
        definitions: [
          ['Tool', 'A controlled interface to an API, application, data source or permitted action.'],
          ['Memory', 'Governed operational state retained for an agent or workflow.'],
          ['Context', 'The evidence, instructions, policy and state available for a decision.'],
          ['Policy', 'A machine-evaluable or human-enforced constraint on access, decisions or actions.'],
          ['Approval', 'An explicit human or authorised-system decision required before work can continue.'],
        ],
      },
      {
        heading: 'Operations',
        definitions: [
          ['Event', 'A fact that may start, advance or alter a workflow.'],
          ['Evaluation', 'A structured assessment of an output, action, process or business outcome.'],
          ['Compensation', 'A balancing business action used when a completed step cannot simply be rolled back.'],
          ['Escalation', 'Transfer of evidence and authority to an accountable person or process.'],
        ],
      },
    ],
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    summary: 'How Nexus separates orchestration, execution, data, governance and observability concerns.',
    updated,
    groups: [
      { heading: 'Control plane', body: ['Defines agent roles, goals, workflows, policies, tools and deployment configuration. Changes should follow controlled review and promotion practices.'] },
      { heading: 'Execution plane', body: ['Runs permitted agent and workflow activity, maintains durable state, invokes tools and coordinates recovery or escalation.'] },
      { heading: 'Data plane', body: ['Connects governed knowledge, context, events and enterprise data while respecting ownership, access and retention boundaries.'] },
      { heading: 'Governance plane', body: ['Evaluates policy, risk, identity, approval and evidence requirements before and after material actions.'] },
      { heading: 'Observability plane', body: ['Captures workflow state, agent traces, tool activity, evaluation, failure, cost and business-outcome signals.'] },
      { heading: 'Deployment concepts', items: ['Dedicated enterprise deployment', 'Customer-managed Kubernetes architecture', 'Private-cloud architecture', 'Hybrid integration boundaries', 'API-first enterprise integration'] },
    ],
  },
  {
    slug: 'agents',
    title: 'Agents',
    summary: 'Define agent capabilities, boundaries, permissions and evaluation obligations.',
    updated,
    groups: [
      { heading: 'Agent definition', body: ['An agent definition describes a logical role rather than an unrestricted autonomous worker. It binds instructions, allowed knowledge, tools, policies, output contracts and escalation behaviour.'] },
      { heading: 'Lifecycle', items: ['Design and responsibility mapping', 'Review and risk classification', 'Registration and environment promotion', 'Controlled activation', 'Ongoing evaluation and versioning', 'Suspension or retirement'] },
      { heading: 'Capabilities and boundaries', items: ['Explicit task scope', 'Structured input and output contracts', 'Permitted models and knowledge sources', 'Tool-level permissions', 'Budget, latency and retry limits', 'Mandatory escalation conditions'] },
      { heading: 'Evaluation', body: ['Agent evaluation combines task quality, policy compliance, evidence quality, operational performance and the contribution to the workflow’s business outcome.'] },
    ],
  },
  {
    slug: 'workflows',
    title: 'Workflows',
    summary: 'Model durable state, transitions, approvals and failure recovery for multi-step agent work.',
    updated,
    groups: [
      { heading: 'Workflow model', body: ['A Nexus workflow is a durable state machine or graph with explicit transitions, evidence and authority boundaries. It may coordinate agents, deterministic services and people.'] },
      { heading: 'State and transitions', items: ['Named workflow states', 'Validated transition conditions', 'Persisted checkpoints', 'Event-driven triggers', 'Timeout and cancellation paths'] },
      { heading: 'Reliability', items: ['Bounded retries with backoff', 'Idempotent tool operations where possible', 'Dead-letter and investigation paths', 'Technical rollback for reversible changes', 'Business compensation for completed transactions', 'Manual intervention and workflow suspension'] },
      { heading: 'Human approvals', body: ['Approval tasks should explain the requested decision, supporting evidence, policy context, deadline and effect of approval or rejection.'] },
    ],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    summary: 'Connect enterprise systems through bounded interfaces and least-privilege tool permissions.',
    updated,
    groups: [
      { heading: 'Integration categories', items: ['REST and event APIs', 'Databases and data platforms', 'Messaging and event infrastructure', 'Enterprise applications', 'Identity systems', 'Approved model providers', 'Monitoring and service-management systems'] },
      { heading: 'Integration principles', items: ['Prefer stable system contracts over interface automation', 'Use dedicated service identities', 'Limit permissions to required resources and actions', 'Validate inputs and outputs at every trust boundary', 'Make timeout, retry and compensation behaviour explicit'] },
      { heading: 'Connector availability', body: ['Integration scope is confirmed during discovery. Architecture examples on this site do not imply that every named platform has a generally available pre-built connector.'] },
    ],
  },
  {
    slug: 'governance',
    title: 'Governance',
    summary: 'Apply policy, approval, separation of duties and audit evidence to agentic workflows.',
    updated,
    groups: [
      { heading: 'Policy model', body: ['Policies can constrain data access, model use, tool invocation, financial or operational authority, and the conditions that require review.'] },
      { heading: 'Approval gates', items: ['Risk-based approval levels', 'Named decision owners', 'Separation of duties', 'Expiry and reassignment', 'Evidence and rationale capture'] },
      { heading: 'Audit evidence', items: ['Identity and role', 'Input and source references', 'Policy decisions', 'Agent and tool activity', 'Human interventions', 'Final outcome and recovery actions'] },
      { heading: 'Risk classification', body: ['Risk classification is organisation-specific and must be agreed with accountable business, security, legal and compliance stakeholders. Nexus AOS does not provide regulatory certification.'] },
    ],
  },
  {
    slug: 'observability',
    title: 'Observability',
    summary: 'Investigate agent, workflow and business behaviour without exposing confidential content unnecessarily.',
    updated,
    groups: [
      { heading: 'Signals', items: ['Agent and workflow traces', 'State transitions and checkpoints', 'Tool invocation and response status', 'Latency and failure reasons', 'Token and model cost', 'Policy decisions', 'Human interventions', 'Evaluation and business outcomes'] },
      { heading: 'Operational investigation', body: ['Investigations should correlate technical signals with workflow state and business effect, while applying access controls and minimising unnecessary retention of prompts or sensitive content.'] },
      { heading: 'Evaluation', items: ['Pre-release scenario evaluation', 'Production sampling', 'Policy-conformance checks', 'Outcome and exception review', 'Regression comparison across versions'] },
    ],
  },
  {
    slug: 'security',
    title: 'Security',
    summary: 'Protect identity, secrets, data boundaries and tool execution across agentic workflows.',
    updated,
    groups: [
      { heading: 'Identity and authorisation', items: ['Enterprise authentication', 'Role-based access', 'Least privilege', 'Workload identities', 'Tool and action permissions', 'Tenant and environment boundaries'] },
      { heading: 'Data and secrets', items: ['Encryption in transit and at rest', 'Managed secret storage', 'Data-boundary enforcement', 'Retention and redaction controls', 'Restricted observability access'] },
      { heading: 'Agent-specific threats', items: ['Prompt-injection defences', 'Untrusted-content isolation', 'Tool input validation', 'Action confirmation and policy gates', 'Output and citation validation', 'Resource and cost limits'] },
      { heading: 'Assurance', body: ['Security requirements and evidence are confirmed for each deployment. Public documentation does not claim certifications or controls that have not been independently verified.'] },
    ],
  },
  {
    slug: 'api',
    title: 'API',
    summary: 'Public API status and approved-access pathway.',
    updated,
    groups: [
      { heading: 'Nexus API access', body: ['API documentation is available to approved pilot and enterprise participants. No public Nexus orchestration API contract is currently published on this site.'] },
      { heading: 'Public platform health', body: ['The existing RhemaAI website API exposes a public health endpoint for service monitoring. It is not a Nexus workflow API.'], code: 'curl https://rhemaaisolutions.tech/api/health' },
      { heading: 'Request access', body: ['Use the Request Demo page to describe the evaluation context and integration categories. Do not include credentials, secrets or confidential production data.'] },
    ],
  },
]

export function getNexusDoc(slug = 'getting-started') {
  return NEXUS_DOC_SECTIONS.find((section) => section.slug === slug)
}
