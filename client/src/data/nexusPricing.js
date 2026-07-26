import { NEXUS_BASE } from './nexusContent'

/**
 * @typedef {Object} NexusPrice
 * @property {string} id
 * @property {string} name
 * @property {string} displayPrice
 * @property {number=} amount
 * @property {'one-time'|'monthly'|'annual'|'custom'} billingPeriod
 * @property {boolean} startingAt
 * @property {boolean=} featured
 * @property {string=} badge
 * @property {string} description
 * @property {string[]} suitableFor
 * @property {string[]} included
 * @property {string[]=} examples
 * @property {string[]=} exclusions
 * @property {string} ctaLabel
 * @property {string} ctaUrl
 * @property {string=} note
 */

/** @type {NexusPrice[]} */
export const NEXUS_ENTRY_PACKAGES = [
  {
    id: 'readiness-assessment',
    name: 'Nexus AI Readiness Assessment',
    displayPrice: '$2,500 fixed fee',
    amount: 2500,
    billingPeriod: 'one-time',
    startingAt: false,
    description: 'Assess whether the organisation has the strategy, processes, data, infrastructure, governance and operational capability required to implement Agentic AI successfully.',
    suitableFor: ['Determining organisational readiness before implementation'],
    included: [
      'Online Agentic AI maturity assessment',
      'Business and technical discovery questionnaire',
      'Assessment across 12 readiness dimensions',
      'Overall maturity score and dimension-level scores',
      'Identification of major readiness gaps',
      'Initial use-case recommendations',
      'Governance and risk observations',
      'Recommended next step',
      'Executive summary report',
      'One 60-minute findings session',
    ],
    exclusions: ['The assessment is diagnostic and advisory. It is not a regulatory certification, security audit or guarantee of implementation success.'],
    ctaLabel: 'Purchase Readiness Assessment',
    ctaUrl: `${NEXUS_BASE}/readiness-assessment`,
  },
  {
    id: 'workflow-discovery',
    name: 'Nexus Workflow Discovery',
    displayPrice: '$5,000 fixed fee',
    amount: 5000,
    billingPeriod: 'one-time',
    startingAt: false,
    description: 'Define one high-value workflow and determine whether it is suitable for a Nexus AOS pilot.',
    suitableFor: ['Defining and de-risking one high-value workflow'],
    included: [
      'Stakeholder discovery session',
      'Current workflow analysis and business objective definition',
      'Agent role identification',
      'Data-source and integration review',
      'Governance and approval requirements',
      'Risk and exception analysis',
      'Proposed Nexus AOS workflow architecture',
      'Pilot scope and success measures',
      'Preliminary implementation roadmap',
      'Discovery report',
      'One 90-minute architecture review',
    ],
    ctaLabel: 'Start Workflow Discovery',
    ctaUrl: `${NEXUS_BASE}/demo?interest=workflow-discovery`,
    note: 'If the client proceeds to a Nexus Standard Pilot within 60 days, up to $2,500 of the Workflow Discovery fee may be credited toward the pilot, subject to the signed proposal and statement of work. This credit is not applied automatically.',
  },
]

/** @type {NexusPrice[]} */
export const NEXUS_PILOT_PACKAGES = [
  {
    id: 'starter-pilot',
    name: 'Nexus Starter Pilot',
    displayPrice: 'From $15,000',
    amount: 15000,
    billingPeriod: 'one-time',
    startingAt: true,
    description: 'Prove operational and business value with one contained, low-to-moderate complexity workflow.',
    suitableFor: ['One contained workflow', 'One department', 'Low-to-moderate integration complexity', 'Proof of operational and business value'],
    included: [
      'One defined workflow',
      'Up to 5 configured agent roles',
      'Up to 2 standard integrations',
      'Basic enterprise knowledge connection',
      'One human approval stage',
      'Standard policy controls',
      'Workflow logging',
      'Basic agent and workflow observability',
      'Pilot evaluation criteria and findings report',
      'Scale recommendation',
      'One administrator training session',
    ],
    examples: ['Internal knowledge workflow', 'Customer-service escalation', 'Document classification', 'Basic data-quality investigation', 'Supplier information research', 'Marketing analysis'],
    exclusions: ['Implementation scope, cloud infrastructure, model usage, data preparation and third-party licence fees may be priced separately.'],
    ctaLabel: 'Discuss a Starter Pilot',
    ctaUrl: `${NEXUS_BASE}/demo?interest=starter-pilot`,
  },
  {
    id: 'standard-pilot',
    name: 'Nexus Standard Pilot',
    displayPrice: 'From $30,000',
    amount: 30000,
    billingPeriod: 'one-time',
    startingAt: true,
    featured: true,
    badge: 'Recommended',
    description: 'Implement one production-oriented workflow with governed actions, approvals and measurable operational outcomes.',
    suitableFor: ['One production-oriented business workflow', 'Multiple agent roles', 'Several enterprise integrations', 'Governed actions and human approvals', 'Measurable operational outcomes'],
    included: [
      'One complex workflow',
      'Up to 10 configured agent roles',
      'Up to 4 standard integrations',
      'Enterprise knowledge and retrieval configuration',
      'Role-based human approvals',
      'Policy-controlled execution',
      'Failure handling and compensation logic',
      'Workflow state management',
      'Evaluation framework',
      'Cost and latency monitoring',
      'Technical documentation',
      'Administrator and operator training',
      'Pilot report and production scale roadmap',
    ],
    examples: ['Agentic Data Engineering operations', 'Procurement orchestration', 'IT incident management', 'Supply-chain exception management', 'Predictive-maintenance coordination', 'Compliance review'],
    ctaLabel: 'Request Standard Pilot Proposal',
    ctaUrl: `${NEXUS_BASE}/demo?interest=standard-pilot`,
  },
  {
    id: 'advanced-pilot',
    name: 'Nexus Advanced Pilot',
    displayPrice: 'From $60,000',
    amount: 60000,
    billingPeriod: 'one-time',
    startingAt: true,
    description: 'Validate an advanced or connected workflow in a regulated, operationally critical or private deployment context.',
    suitableFor: ['Regulated environments', 'Operationally critical workflows', 'Complex integration requirements', 'Multiple departments or teams', 'Customer-managed or private deployment'],
    included: [
      'One advanced workflow or connected workflow group',
      'Up to 15 configured agent roles',
      'Up to 6 standard integrations',
      'Customer identity integration',
      'Advanced approval policies and segregation of duties',
      'Full audit and decision trail',
      'Advanced failure recovery and compensation workflows',
      'Security and governance configuration',
      'Enhanced observability',
      'Environment-specific deployment',
      'Technical validation',
      'Operator and developer enablement',
      'Pilot findings and enterprise rollout plan',
    ],
    exclusions: ['Regulatory validation, independent security testing, specialist legal review, clinical validation, financial-model validation and third-party certification are outside the base pilot price.'],
    ctaLabel: 'Discuss an Advanced Pilot',
    ctaUrl: `${NEXUS_BASE}/demo?interest=advanced-pilot`,
  },
]

/** @type {NexusPrice[]} */
export const NEXUS_LICENSES = [
  {
    id: 'department',
    name: 'Nexus Department',
    displayPrice: '$30,000/year',
    amount: 30000,
    billingPeriod: 'annual',
    startingAt: false,
    description: 'A production licence for one department, one primary business domain and a limited workflow portfolio.',
    suitableFor: ['One department', 'One primary business domain', 'A limited production workflow portfolio'],
    included: [
      'Nexus AOS platform licence and CADABA orchestration framework',
      'One production and one non-production environment',
      'Up to 5 production workflows',
      'Standard governance controls',
      'Human approval workflows',
      'Standard observability',
      'Product updates and security patches',
      'Documentation',
      'Standard business-hours support',
    ],
    exclusions: ['Implementation, cloud infrastructure, LLM usage, storage, search, networking and third-party services are not included.'],
    ctaLabel: 'Request Department Pricing',
    ctaUrl: `${NEXUS_BASE}/demo?interest=department`,
  },
  {
    id: 'business',
    name: 'Nexus Business',
    displayPrice: '$90,000/year',
    amount: 90000,
    billingPeriod: 'annual',
    startingAt: false,
    featured: true,
    badge: 'Best for Growing Organisations',
    description: 'Broader production use across multiple departments, workflows and enterprise integrations.',
    suitableFor: ['Multiple departments', 'Several workflows', 'Broader enterprise integration', 'More advanced governance requirements'],
    included: [
      'Everything in Nexus Department',
      'Up to 20 production workflows',
      'Up to 3 business domains',
      'Multiple production teams',
      'Advanced workflow orchestration and policy configuration',
      'Enterprise identity integration support',
      'Workflow recovery and compensation',
      'Enhanced observability and evaluation dashboards',
      'Staging and production environments',
      'Quarterly architecture review',
      'Priority support eligibility',
    ],
    ctaLabel: 'Request Business Pricing',
    ctaUrl: `${NEXUS_BASE}/demo?interest=business`,
  },
  {
    id: 'enterprise',
    name: 'Nexus Enterprise',
    displayPrice: 'From $200,000/year',
    amount: 200000,
    billingPeriod: 'annual',
    startingAt: true,
    description: 'Organisation-wide, multi-domain operation with custom capacity and private or customer-managed deployment options.',
    suitableFor: ['Organisation-wide adoption', 'Multiple business domains', 'High workflow volume', 'Private or customer-managed deployment', 'Regulated or operationally critical use cases'],
    included: [
      'Multi-domain Nexus AOS licence',
      'Custom workflow capacity',
      'Multiple environments',
      'Private-cloud or customer-managed deployment options',
      'Advanced governance and central policy management',
      'Department and tenant separation',
      'Enterprise identity and access integration',
      'Advanced observability',
      'Architecture advisory and dedicated success reviews',
      'Enterprise support options',
      'Custom integration pathway',
    ],
    ctaLabel: 'Contact Enterprise Sales',
    ctaUrl: `${NEXUS_BASE}/demo?interest=enterprise`,
    note: 'Final enterprise pricing depends on deployment model, workflow volume, integration requirements, support coverage, governance requirements and operating scale.',
  },
]

export const NEXUS_PRIMARY_PRICING = [
  ...NEXUS_ENTRY_PACKAGES,
  ...NEXUS_PILOT_PACKAGES,
  ...NEXUS_LICENSES,
]

export const NEXUS_IMPLEMENTATION_SERVICES = [
  { id: 'basic-deployment', name: 'Basic Nexus Deployment', displayPrice: 'From $10,000', included: ['Platform environment setup', 'Standard configuration', 'One identity configuration', 'Basic logging and monitoring', 'Deployment documentation'] },
  { id: 'department-implementation', name: 'Department Implementation', displayPrice: 'From $25,000', included: ['Department-level deployment', 'Workflow implementation', 'Selected integrations', 'Governance configuration', 'Human approvals', 'Testing', 'Administrator enablement'] },
  { id: 'enterprise-implementation', name: 'Enterprise Implementation', displayPrice: 'From $75,000', included: ['Enterprise deployment architecture', 'Multiple environments', 'Identity and access integration', 'Advanced governance', 'Multiple business-system integrations', 'Observability configuration', 'Security hardening', 'Operational documentation', 'Training and rollout support'] },
  { id: 'custom-integration', name: 'Custom Integration', displayPrice: 'From $5,000 per integration', included: ['Standard integration work'], note: 'Legacy systems, undocumented APIs, custom middleware, real-time operational technology, regulated data, extensive transformation or vendor restrictions require a custom quotation.' },
  { id: 'custom-workflow', name: 'Custom Agentic Workflow', displayPrice: 'From $7,500 per workflow', included: ['Additional workflows outside the purchased pilot or implementation scope'], note: 'Pricing depends on agent roles, integration and policy complexity, human approvals, data and evaluation requirements, and operational criticality.' },
]

export const NEXUS_SUPPORT_PACKAGES = [
  { id: 'standard-support', name: 'Standard Support', displayPrice: 'Included with annual platform licences', included: ['Email support', 'Product updates', 'Security patches', 'Documentation access', 'Support during standard business hours'] },
  { id: 'priority-support', name: 'Priority Support', displayPrice: '15% of annual licence', examples: ['Nexus Department: $4,500/year', 'Nexus Business: $13,500/year', 'Nexus Enterprise at $200,000: from $30,000/year'], included: ['Priority issue handling', 'Upgrade assistance', 'Quarterly operational review', 'Architecture consultation', 'Escalation pathway', 'Deployment guidance'], ctaLabel: 'Add Priority Support', ctaUrl: `${NEXUS_BASE}/demo?interest=managed-services` },
  { id: 'premium-support', name: 'Premium Support', displayPrice: '25% of annual licence', examples: ['Nexus Department: $7,500/year', 'Nexus Business: $22,500/year', 'Nexus Enterprise at $200,000: from $50,000/year'], included: ['Named technical contact', 'Monthly operational review', 'Incident coordination', 'Priority escalation', 'Architecture guidance', 'Release and upgrade planning', 'Expanded support coverage by agreement'], note: 'Premium Support is not described as 24/7 support. Any expanded coverage is subject to a signed agreement and confirmed operating capability.' },
]

export const NEXUS_TRAINING = [
  { name: 'Executive Nexus AOS briefing', displayPrice: '$1,500', included: ['90-minute executive briefing', 'Business use-case overview', 'Governance responsibilities', 'Adoption roadmap', 'Executive questions and answers'] },
  { name: 'Nexus administrator workshop', displayPrice: '$3,500', included: ['Platform administration', 'Workflow monitoring', 'Policy management', 'Human approvals', 'Incident and escalation procedures'] },
  { name: 'Nexus developer workshop', displayPrice: '$5,000', included: ['Nexus concepts', 'Agent roles', 'Workflow definitions', 'Tool integration', 'Evaluation', 'Testing', 'Security boundaries'] },
  { name: 'Agentic workflow design workshop', displayPrice: '$5,000' },
  { name: 'Two-day enterprise implementation bootcamp', displayPrice: '$10,000' },
  { name: 'Custom enterprise enablement programme', displayPrice: 'Contact Sales' },
]

export const NEXUS_MANAGED_SERVICES = [
  { name: 'Nexus Operations Review', displayPrice: '$2,000 per month', included: ['Monthly operational health review', 'Workflow-performance review', 'Cost review', 'Failure and exception review', 'Governance observations', 'Improvement recommendations'] },
  { name: 'Nexus Managed Operations', displayPrice: 'From $5,000 per month', included: ['Platform monitoring', 'Workflow operational review', 'Release coordination', 'Configuration assistance', 'Incident triage support', 'Monthly reporting'], note: 'Does not include cloud infrastructure, model usage, new workflow development or unlimited support.' },
  { name: 'Dedicated Architecture Advisory', displayPrice: '$3,000 per month', included: ['Monthly architecture session', 'Design review', 'Integration advice', 'Governance guidance', 'Scaling recommendations', 'Roadmap support'] },
]

export const NEXUS_COMPLEXITY_BANDS = [
  { name: 'Standard-complexity domains', adjustment: 'No automatic uplift', domains: ['Marketing', 'Customer Service', 'Education', 'Entertainment', 'Retail', 'Research', 'Human Resources'], description: 'Use the standard starting prices.' },
  { name: 'Operationally complex domains', adjustment: '20% to 40% implementation uplift', domains: ['Energy', 'Manufacturing', 'Transportation', 'Telecommunications', 'Smart City', 'Agriculture', 'Supply Chain', 'Real Estate', 'Smart Home'], description: 'The final uplift depends on real-time data, operational technology, event volume, reliability, physical-system integration, safety and availability requirements. It is quoted, not automatically calculated.' },
  { name: 'Regulated or high-risk domains', adjustment: '30% to 60% implementation and governance uplift', domains: ['Finance', 'Healthcare', 'Legal', 'Cybersecurity', 'Public safety', 'Safety-critical Energy workflows'], description: 'The uplift accounts for governance analysis, validation, security controls, audit evidence, human approval, data protection, specialist review, testing and documentation. Regulated-industry pricing is confirmed after discovery and risk assessment.' },
]

export const NEXUS_COMMERCIAL_TERMS = [
  'Assessments and discovery engagements are invoiced in advance.',
  'Pilot projects normally require 50% payment at commencement, 30% at an agreed milestone and 20% on final delivery.',
  'Annual platform licences are invoiced annually in advance.',
  'Implementation services may follow milestone-based payment terms.',
  'Cloud infrastructure, model usage, taxes, travel, third-party licences and specialist external services are excluded unless expressly included.',
  'Custom work requires a signed statement of work.',
  'Nexus AOS and CADABA intellectual property remain the property of RhemaAI Solutions Ltd unless a separate written agreement states otherwise.',
  'Customers retain ownership of their business data, subject to the applicable contract and data-processing terms.',
  'Prices may be revised before a proposal is signed.',
  'Signed proposals remain valid for the period stated in the proposal.',
]

export const NEXUS_PRICING_NOTES = [
  'Prices exclude applicable taxes.',
  'Cloud infrastructure and AI model usage are priced separately.',
  'Implementation and custom integrations are not included in annual platform licence prices.',
  'Final pricing depends on scope, integrations, deployment model, security, governance and support requirements.',
  'All prices are subject to a signed proposal, statement of work and commercial agreement.',
]

export const NEXUS_PRICING_FAQS = [
  ['Is Nexus AOS sold as a monthly subscription?', 'Nexus AOS is primarily licensed annually for enterprise use. Assessments, discovery, pilots, implementation, training, infrastructure and support are priced separately.'],
  ['Is the pilot fee included in the annual licence?', 'No. A pilot covers workflow design, configuration, integration, governance, testing and evaluation. The annual licence covers ongoing use of the Nexus AOS platform after the pilot.'],
  ['Are cloud and AI model costs included?', 'No. Cloud infrastructure, language-model usage, storage, databases, search, monitoring, networking and third-party services are charged separately.'],
  ['Can Nexus AOS run in our cloud environment?', 'Customer-managed cloud, Kubernetes, private-cloud and hybrid deployment options may be available depending on the selected package and technical requirements.'],
  ['Do we need a Readiness Assessment before a pilot?', 'Not in every case. Organisations with a well-defined workflow and suitable technical readiness may begin with Workflow Discovery or a pilot proposal.'],
  ['Can the assessment fee be credited toward a pilot?', 'Up to $2,500 of the Workflow Discovery fee may be credited toward a Standard Pilot when agreed in the commercial proposal and the pilot begins within 60 days.'],
  ['Does the annual licence include custom workflows?', 'The annual licence includes platform usage within the selected tier. New workflow implementation, custom agents, integrations and substantial configuration changes are separately scoped.'],
  ['Why do regulated industries cost more?', 'Regulated and high-risk workflows normally require additional governance analysis, security controls, audit evidence, validation, human oversight, testing and specialist review.'],
  ['Is source code included?', 'No. The standard commercial model licenses Nexus AOS and the CADABA framework. Source-code transfer is not included unless governed by a separate negotiated agreement.'],
  ['Can pricing be customised?', 'Yes. Enterprise pricing depends on workflow volume, business domains, deployment model, integrations, governance, security, support coverage and operating scale.'],
]

export const NEXUS_INTEREST_OPTIONS = [
  { value: 'demo', label: 'Product demonstration' },
  ...NEXUS_PRIMARY_PRICING.map((offer) => ({
    value: offer.id,
    label: `${offer.name.replace('Nexus AI ', 'AI ').replace('Nexus ', '')} — ${offer.displayPrice.replace(' fixed fee', '').replace('From ', 'from ')}`,
  })),
  { value: 'implementation-services', label: 'Implementation services' },
  { value: 'training', label: 'Training' },
  { value: 'managed-services', label: 'Managed services' },
  { value: 'other', label: 'Other' },
]

export const NEXUS_BUDGET_OPTIONS = [
  ['under-10k', 'Under $10,000'],
  ['10k-25k', '$10,000–$25,000'],
  ['25k-50k', '$25,000–$50,000'],
  ['50k-100k', '$50,000–$100,000'],
  ['100k-250k', '$100,000–$250,000'],
  ['250k-500k', '$250,000–$500,000'],
  ['above-500k', 'Above $500,000'],
  ['not-defined', 'Budget not yet defined'],
]

export function getNexusInterest(value) {
  if (value === 'pilot') return 'standard-pilot'
  if (value === 'discovery') return 'workflow-discovery'
  return NEXUS_INTEREST_OPTIONS.some((option) => option.value === value) ? value : 'demo'
}
