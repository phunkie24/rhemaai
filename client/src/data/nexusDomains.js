/**
 * @typedef {Object} NexusDomain
 * @property {string} slug
 * @property {string} name
 * @property {string} description
 * @property {number} designCount
 * @property {number} percentage
 * @property {string[]} featuredApplications
 * @property {string[]} businessOutcomes
 * @property {string[]} agentRoles
 * @property {string[]} exampleWorkflow
 * @property {string[]} governanceConsiderations
 * @property {string[]} integrations
 * @property {string[]} relatedDomains
 * @property {'featured'|'available'|'exploratory'} status
 */

const DEFAULT_GOVERNANCE = [
  'Policy-controlled tool and data access',
  'Human approval for material or high-risk actions',
  'Traceable decisions, evidence and workflow state',
  'Escalation when confidence or authority boundaries are reached',
]

const DEFAULT_INTEGRATIONS = [
  'Enterprise applications and APIs',
  'Operational data platforms',
  'Identity and access systems',
  'Messaging and collaboration tools',
  'Monitoring and audit platforms',
]

function createDomain({
  slug,
  name,
  designCount,
  percentage,
  featuredApplications,
  status = 'available',
  description,
  agentRoles,
  exampleWorkflow,
  businessOutcomes,
  governanceConsiderations = DEFAULT_GOVERNANCE,
  integrations = DEFAULT_INTEGRATIONS,
  relatedDomains = [],
  disclaimer,
}) {
  const primaryApplication = featuredApplications[0]
  return {
    slug,
    name,
    description: description || `Configure governed agent roles to coordinate ${name.toLowerCase()} workflows, evidence and human decisions across existing enterprise systems.`,
    designCount,
    percentage,
    featuredApplications,
    businessOutcomes: businessOutcomes || [
      `Faster coordination around ${primaryApplication.toLowerCase()}`,
      'More consistent policy and approval execution',
      'A clearer operational evidence trail',
    ],
    agentRoles: agentRoles || [
      `${name} Intake Agent`,
      `${name} Evidence Agent`,
      `${name} Planning Agent`,
      'Policy and Risk Agent',
      'Human Approval Coordinator',
      'Audit Evidence Agent',
    ],
    exampleWorkflow: exampleWorkflow || [
      'Operational event or request received',
      'Context and relevant evidence assembled',
      'Specialist agents assess options and constraints',
      'Policy and authority boundaries evaluated',
      'Human approval requested where required',
      'Permitted action executed or escalated',
      'Outcome and decision trail recorded',
    ],
    governanceConsiderations,
    integrations,
    relatedDomains,
    status,
    disclaimer,
  }
}

/** @type {NexusDomain[]} */
export const NEXUS_DOMAINS = [
  createDomain({
    slug: 'energy',
    name: 'Energy',
    designCount: 3839,
    percentage: 76.8,
    status: 'featured',
    featuredApplications: ['Fault detection', 'Predictive maintenance', 'Grid optimisation', 'Peak shaving', 'Storage optimisation'],
    description: 'Coordinate telemetry, asset, maintenance and operating agents while retaining engineering authority, safety controls and complete intervention records.',
    agentRoles: ['Asset Observer', 'Fault Detection Agent', 'Maintenance Planning Agent', 'Grid Optimisation Agent', 'Safety and Policy Agent', 'Human Operations Coordinator', 'Audit Evidence Agent'],
    integrations: ['SCADA and telemetry platforms', 'Enterprise asset management', 'Maintenance systems', 'Energy data platforms', 'Weather and market data', 'Identity and monitoring systems'],
    relatedDomains: ['manufacturing', 'smart-city', 'transportation'],
  }),
  createDomain({
    slug: 'finance',
    name: 'Finance',
    designCount: 129,
    percentage: 2.6,
    status: 'featured',
    featuredApplications: ['Payment processing', 'Financial forecasting', 'Portfolio optimisation', 'Algorithmic trading', 'Risk assessment'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Model, conduct and regulatory controls appropriate to the financial activity'],
    integrations: ['Core finance and payment platforms', 'Market and reference data', 'Risk systems', 'Identity and case management', 'Audit and reporting platforms'],
    relatedDomains: ['supply-chain', 'cybersecurity', 'legal'],
  }),
  createDomain({
    slug: 'smart-city',
    name: 'Smart City',
    designCount: 103,
    percentage: 2.1,
    featuredApplications: ['Urban planning', 'Infrastructure monitoring', 'Air-quality monitoring', 'Emergency response', 'Public safety'],
    integrations: ['City data platforms', 'IoT and sensor networks', 'Geospatial systems', 'Incident management', 'Public communications'],
    relatedDomains: ['energy', 'transportation', 'telecommunications'],
  }),
  createDomain({
    slug: 'legal',
    name: 'Legal',
    designCount: 97,
    percentage: 1.9,
    featuredApplications: ['E-discovery', 'Case prediction', 'Case management', 'Client intake', 'Argument generation'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Qualified legal review for advice, filings and material decisions'],
    integrations: ['Case management systems', 'Document repositories', 'E-discovery platforms', 'Knowledge bases', 'Identity and communications'],
    relatedDomains: ['finance', 'human-resources', 'research'],
  }),
  createDomain({
    slug: 'smart-home',
    name: 'Smart Home',
    designCount: 61,
    percentage: 1.2,
    featuredApplications: ['Occupancy detection', 'Energy management', 'Resource optimisation', 'Predictive maintenance', 'Scene automation'],
    integrations: ['Home automation hubs', 'IoT devices and sensors', 'Energy platforms', 'Identity and consent services', 'Device monitoring'],
    relatedDomains: ['energy', 'cybersecurity', 'telecommunications'],
  }),
  createDomain({
    slug: 'customer-service',
    name: 'Customer Service',
    designCount: 61,
    percentage: 1.2,
    featuredApplications: ['Intent classification', 'Automated response', 'Proactive support', 'Satisfaction prediction', 'Personalisation'],
    integrations: ['CRM platforms', 'Contact centre systems', 'Knowledge bases', 'Email and messaging', 'Quality and analytics platforms'],
    relatedDomains: ['retail', 'marketing', 'telecommunications'],
  }),
  createDomain({
    slug: 'education',
    name: 'Education',
    designCount: 59,
    percentage: 1.2,
    featuredApplications: ['Adaptive tutoring', 'Skill-gap analysis', 'Engagement monitoring', 'Assessment automation', 'Personalised learning'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Age-appropriate consent, accessibility and educator oversight'],
    integrations: ['Learning management systems', 'Student information systems', 'Content repositories', 'Assessment platforms', 'Identity systems'],
    relatedDomains: ['human-resources', 'research', 'customer-service'],
  }),
  createDomain({
    slug: 'retail',
    name: 'Retail',
    designCount: 58,
    percentage: 1.2,
    featuredApplications: ['Visual merchandising', 'Promotional planning', 'Inventory optimisation', 'Recommendation systems', 'Churn prediction'],
    integrations: ['Commerce platforms', 'Inventory and order systems', 'CRM and loyalty platforms', 'Warehouse data', 'Marketing tools'],
    relatedDomains: ['marketing', 'supply-chain', 'customer-service'],
  }),
  createDomain({
    slug: 'human-resources',
    name: 'Human Resources',
    designCount: 58,
    percentage: 1.2,
    featuredApplications: ['Workforce planning', 'Onboarding automation', 'Learning-path recommendation', 'Performance prediction', 'Skill matching'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Fairness, explainability, privacy and accountable human employment decisions'],
    integrations: ['HR information systems', 'Applicant tracking systems', 'Learning platforms', 'Identity systems', 'Workforce analytics'],
    relatedDomains: ['education', 'legal', 'customer-service'],
  }),
  createDomain({
    slug: 'real-estate',
    name: 'Real Estate',
    designCount: 57,
    percentage: 1.1,
    featuredApplications: ['Market forecasting', 'Buyer matching', 'Compliance checking', 'Rental optimisation', 'Maintenance prediction'],
    integrations: ['Property management systems', 'Listing and market data', 'Document repositories', 'Maintenance platforms', 'Finance systems'],
    relatedDomains: ['finance', 'legal', 'smart-city'],
  }),
  createDomain({
    slug: 'manufacturing',
    name: 'Manufacturing',
    designCount: 56,
    percentage: 1.1,
    status: 'featured',
    featuredApplications: ['Inventory management', 'Resource scheduling', 'Predictive maintenance', 'Equipment monitoring', 'Supply-chain coordination'],
    integrations: ['MES and ERP platforms', 'Industrial IoT and historians', 'Maintenance systems', 'Quality platforms', 'Supply-chain systems'],
    relatedDomains: ['energy', 'supply-chain', 'transportation'],
  }),
  createDomain({
    slug: 'healthcare',
    name: 'Healthcare',
    designCount: 55,
    percentage: 1.1,
    status: 'featured',
    featuredApplications: ['Care coordination', 'Health-risk prediction', 'Symptom assessment', 'Patient monitoring', 'Treatment planning'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Clinical validation, privacy, security and qualified medical oversight'],
    integrations: ['Electronic health record platforms', 'Care coordination systems', 'Clinical data platforms', 'Identity and consent systems', 'Monitoring platforms'],
    relatedDomains: ['research', 'cybersecurity', 'human-resources'],
    disclaimer: 'Nexus AOS does not replace qualified medical judgement. Healthcare implementations require appropriate clinical, privacy, security and regulatory controls.',
  }),
  createDomain({
    slug: 'entertainment',
    name: 'Entertainment',
    designCount: 51,
    percentage: 1.0,
    featuredApplications: ['Audience segmentation', 'Monetisation optimisation', 'Churn prevention', 'Trend analysis', 'User profiling'],
    integrations: ['Content platforms', 'Audience analytics', 'Subscription systems', 'Rights and catalogue data', 'Marketing tools'],
    relatedDomains: ['marketing', 'customer-service', 'retail'],
  }),
  createDomain({
    slug: 'marketing',
    name: 'Marketing',
    designCount: 51,
    percentage: 1.0,
    featuredApplications: ['Budget allocation', 'Customer-journey mapping', 'A/B testing', 'Competitive analysis', 'Conversion optimisation'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Consent, preference and responsible personalisation controls'],
    integrations: ['CRM and customer data platforms', 'Campaign tools', 'Web analytics', 'Content systems', 'Experimentation platforms'],
    relatedDomains: ['retail', 'customer-service', 'entertainment'],
  }),
  createDomain({
    slug: 'transportation',
    name: 'Transportation',
    designCount: 46,
    percentage: 0.9,
    featuredApplications: ['Rider matching', 'Fuel optimisation', 'Collision avoidance', 'Parking management', 'Fleet management'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Safety-critical actions remain within validated operating and human authority boundaries'],
    integrations: ['Fleet and transport management', 'Telematics and IoT', 'Geospatial platforms', 'Maintenance systems', 'Traffic and weather data'],
    relatedDomains: ['smart-city', 'energy', 'supply-chain'],
  }),
  createDomain({
    slug: 'supply-chain',
    name: 'Supply Chain',
    designCount: 46,
    percentage: 0.9,
    status: 'featured',
    featuredApplications: ['Returns management', 'Procurement automation', 'Order fulfilment', 'Visibility tracking', 'Cost optimisation'],
    integrations: ['ERP and procurement platforms', 'Supplier and contract data', 'Order and warehouse systems', 'Logistics platforms', 'Finance workflows'],
    relatedDomains: ['manufacturing', 'retail', 'transportation'],
  }),
  createDomain({
    slug: 'research',
    name: 'Research',
    designCount: 45,
    percentage: 0.9,
    featuredApplications: ['Publication optimisation', 'Methodology recommendation', 'Collaboration facilitation', 'Hypothesis generation', 'Trend identification'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Source attribution, research integrity and expert methodology review'],
    integrations: ['Research repositories', 'Scholarly databases', 'Laboratory data platforms', 'Collaboration tools', 'Publication systems'],
    relatedDomains: ['education', 'healthcare', 'legal'],
  }),
  createDomain({
    slug: 'telecommunications',
    name: 'Telecommunications',
    designCount: 44,
    percentage: 0.9,
    featuredApplications: ['Fault prediction', 'Latency reduction', 'Spectrum allocation', 'Churn prediction', 'Network optimisation'],
    integrations: ['Network operations systems', 'Telemetry and event platforms', 'Customer systems', 'Service management', 'Capacity and planning tools'],
    relatedDomains: ['cybersecurity', 'smart-city', 'customer-service'],
  }),
  createDomain({
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    designCount: 43,
    percentage: 0.9,
    status: 'featured',
    featuredApplications: ['Behavioural analysis', 'Malware analysis', 'Intrusion prevention', 'Risk assessment', 'Incident response'],
    governanceConsiderations: [...DEFAULT_GOVERNANCE, 'Strict tool permissions and mandatory approval for disruptive response actions'],
    integrations: ['SIEM and SOAR platforms', 'Identity and access systems', 'Endpoint and network telemetry', 'Threat intelligence', 'Case management'],
    relatedDomains: ['finance', 'telecommunications', 'smart-city'],
  }),
  createDomain({
    slug: 'agriculture',
    name: 'Agriculture',
    designCount: 41,
    percentage: 0.8,
    featuredApplications: ['Pest detection', 'Soil analysis', 'Fertiliser optimisation', 'Disease detection', 'Weather adaptation'],
    integrations: ['Farm management platforms', 'IoT and field sensors', 'Weather and geospatial data', 'Equipment systems', 'Supply-chain platforms'],
    relatedDomains: ['energy', 'supply-chain', 'transportation'],
  }),
]

export const FEATURED_DOMAIN_SLUGS = [
  'energy',
  'finance',
  'manufacturing',
  'healthcare',
  'cybersecurity',
  'supply-chain',
]

export function getNexusDomain(slug) {
  return NEXUS_DOMAINS.find((domain) => domain.slug === slug)
}

export function formatDesignCount(value) {
  return Number(value).toLocaleString('en-GB')
}
