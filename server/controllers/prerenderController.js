import Product from '../models/Product.js'
import Insight from '../models/Insight.js'
import Publication from '../models/Publication.js'
import Course from '../models/Course.js'

const SITE_NAME = 'RhemaAI Solutions Ltd'
const BASE = (process.env.FRONTEND_URL || 'https://rhemaaisolutions.tech').replace(/\/$/, '')
const DEFAULT_IMAGE = `${BASE}/brand/rhemaai-company-social.jpg`
const NEXUS_IMAGE = '/nexus-aos-social-preview.png'

// This controller exists only for crawlers that don't execute JavaScript
// (social link-preview bots, some search bots). Real browsers never reach
// these routes — nginx only proxies known-bot user agents here (see
// client/nginx.conf) — so the SPA experience for humans is unaffected.

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function absoluteImage(image) {
  if (!image) return DEFAULT_IMAGE
  if (/^https?:\/\//i.test(image)) return image
  return `${BASE}${image.startsWith('/') ? '' : '/'}${image}`
}

function sendMeta(res, { path, title, description, image, type = 'website' }) {
  const canonical = `${BASE}${path}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const ogImage = absoluteImage(image)
  const safeDescription = esc(description || '')

  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${esc(fullTitle)}</title>
<meta name="description" content="${safeDescription}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${esc(canonical)}" />
<meta property="og:type" content="${esc(type)}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:title" content="${esc(fullTitle)}" />
<meta property="og:description" content="${safeDescription}" />
<meta property="og:image" content="${esc(ogImage)}" />
<meta property="og:image:alt" content="${esc(fullTitle)}" />
${ogImage === DEFAULT_IMAGE ? '<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />' : ''}
<meta property="og:site_name" content="${SITE_NAME}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(fullTitle)}" />
<meta name="twitter:description" content="${safeDescription}" />
<meta name="twitter:image" content="${esc(ogImage)}" />
<meta name="twitter:image:alt" content="${esc(fullTitle)}" />
</head>
<body>
<h1>${esc(title)}</h1>
<p>${safeDescription}</p>
</body>
</html>`)
}

function sendNotFound(res) {
  res.status(404).type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Page Not Found | ${SITE_NAME}</title>
<meta name="description" content="The page you're looking for doesn't exist or hasn't been published yet." />
<meta name="robots" content="noindex, nofollow" />
</head>
<body><h1>Page Not Found</h1></body>
</html>`)
}

const STATIC_PAGES = {
  '/': {
    title: 'RhemaAI Solutions Ltd | Enterprise AI, Data Engineering & Agentic AI',
    description: 'Nigeria-based enterprise AI consultancy delivering agentic AI systems, data engineering pipelines, Azure cloud architecture, machine learning, BI analytics and data science for UK, US, UAE, South Africa, Kenya, Canada, Australia and global enterprises.',
  },
  '/services': {
    title: 'AI, Data Engineering & Cloud Services | RhemaAI Solutions Ltd',
    description: 'End-to-end enterprise services: agentic AI systems, data engineering pipelines, Azure cloud architecture, MLOps, machine learning, BI analytics and data science — delivered globally from Nigeria to UK, US, UAE, South Africa and beyond.',
  },
  '/products': {
    title: 'Enterprise AI & Data Platform Products | RhemaAI Solutions Ltd',
    description: 'RhemaAI Platform products for agentic AI, RAG, NLP, XAI, optimisation, BI, data engineering, streaming, MLOps, cloud, security, quantitative research, edge AI, technical training and publications.',
  },
  '/case-studies': {
    title: 'Enterprise AI & Data Engineering Case Studies | RhemaAI Solutions Ltd',
    description: 'Production deployments across FinTech, Energy, Enterprise, Retail, Healthcare, Manufacturing and Data Engineering, built and delivered by RhemaAI Solutions.',
  },
  '/about': {
    title: 'About RhemaAI Solutions Ltd | Enterprise AI & Data Engineering Firm Nigeria',
    description: 'RhemaAI Solutions Ltd is a Nigeria-based enterprise AI and data engineering consultancy led by Funke R. Yusuf. Azure, AWS and GCP certified. 10,000+ agentic AI implementations across fintech, energy, healthcare and manufacturing globally.',
  },
  '/insights': {
    title: 'AI & Data Engineering Research | RhemaAI Labs',
    description: 'Enterprise AI research, data engineering guides, agentic AI architecture, machine learning patterns, Azure cloud, MLOps, and BI analytics insights from RhemaAI Labs — written for senior practitioners in Nigeria, UK, US, UAE and globally.',
  },
  '/publications': {
    title: 'AI & Data Engineering Books & Whitepapers | RhemaAI Press',
    description: 'Books and white papers from RhemaAI Press for enterprise AI, agentic AI, data engineering and cloud architecture leaders. Featuring Multi-Agent Orchestration Patterns — the essential guide to scalable LLM systems.',
  },
  '/courses': {
    title: 'Enterprise AI & Data Engineering Courses | RhemaAI Academy',
    description: 'Free and premium RhemaAI Academy courses: agentic AI, generative AI, data engineering, machine learning, Azure cloud architecture, data science and advanced analytics — taught at enterprise production level for professionals in Nigeria, UK, US, UAE and globally.',
  },
  '/contact': {
    title: 'Book a Consultation | RhemaAI Solutions Ltd',
    description: 'Book a free consultation with RhemaAI Solutions Ltd. Discuss enterprise AI, data engineering, Azure cloud architecture, machine learning, BI analytics or agentic AI for your organisation globally.',
  },
  '/careers': {
    title: 'Careers in AI & Data Engineering | RhemaAI Solutions Ltd',
    description: 'Join RhemaAI Solutions Ltd. Open roles for AI engineers, data engineers, machine learning scientists, Azure cloud architects and data scientists building enterprise-grade systems — remote-first, based in Nigeria with global reach.',
  },
}

function staticHandler(path) {
  return (req, res) => sendMeta(res, { path, ...STATIC_PAGES[path] })
}

export const renderHome = staticHandler('/')
export const renderServices = staticHandler('/services')
export const renderProducts = staticHandler('/products')
export const renderCaseStudies = staticHandler('/case-studies')
export const renderAbout = staticHandler('/about')
export const renderInsights = staticHandler('/insights')
export const renderPublications = staticHandler('/publications')
export const renderCourses = staticHandler('/courses')
export const renderContact = staticHandler('/contact')
export const renderCareers = staticHandler('/careers')

const NEXUS_STATIC_META = {
  '/products/nexus-aos': {
    title: 'Nexus AOS | Governed Enterprise Agentic AI',
    description: 'Build, govern and operate enterprise AI agents with Nexus AOS, RhemaAI Solutions Ltd’s multi-agent orchestration platform powered by CADABA.',
  },
  '/products/nexus-aos/demo': {
    title: 'Nexus AOS Demo | RhemaAI Solutions Ltd',
    description: 'Request a tailored enterprise Nexus AOS demonstration covering orchestration, human approvals, policy, data integration, observability and deployment.',
  },
  '/products/nexus-aos/readiness-assessment': {
    title: 'Agentic AI Readiness Assessment | Nexus AOS',
    description: 'Assess strategy, data, integration, security, governance, oversight and operational readiness for a governed Nexus AOS workflow.',
  },
  '/products/nexus-aos/solutions': {
    title: 'Nexus AOS Solutions | 20 Agentic AI Domains',
    description: 'Explore Nexus AOS governed agentic workflow designs across twenty real-world application domains.',
  },
  '/products/nexus-aos/solutions/agentic-data-engineering': {
    title: 'Agentic Data Engineering | Nexus AOS',
    description: 'Operate data platforms with governed AI agent roles for pipelines, quality, metadata, incidents and accountable remediation.',
  },
  '/products/nexus-aos/solutions/procurement': {
    title: 'Procurement Automation | Nexus AOS',
    description: 'Coordinate procurement decisions across agents, enterprise systems, policy checks and human approvals.',
  },
  '/products/nexus-aos/architecture': {
    title: 'Nexus AOS Architecture | CADABA Agent Orchestration',
    description: 'Explore the logical architecture, CADABA cognitive loop, reliability, security and observability model behind Nexus AOS.',
  },
  '/products/nexus-aos/pricing': {
    title: 'Nexus AOS Pricing and Pilot Packages | RhemaAI Solutions Ltd',
    description: 'Nexus AOS deployments start from ₦7,500,000 / $20,000. Compare assessments, architecture blueprints, deployment packages and Professional, Enterprise or 24/7 Mission-Critical AgentOps.',
  },
  '/products/nexus-aos/docs': {
    title: 'Nexus AOS Documentation | Developer Portal',
    description: 'Public concepts, architecture, governance, security and evaluation documentation for Nexus AOS.',
  },
}

export function renderNexusStatic(req, res) {
  const meta = NEXUS_STATIC_META[req.path]
  if (!meta) return sendNotFound(res)
  return sendMeta(res, { path: req.path, image: NEXUS_IMAGE, ...meta })
}

function titleCaseSlug(value = '') {
  return value.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const NEXUS_DOMAIN_SLUGS = new Set([
  'energy',
  'finance',
  'smart-city',
  'legal',
  'smart-home',
  'customer-service',
  'education',
  'retail',
  'human-resources',
  'real-estate',
  'manufacturing',
  'healthcare',
  'entertainment',
  'marketing',
  'transportation',
  'supply-chain',
  'research',
  'telecommunications',
  'cybersecurity',
  'agriculture',
])

const NEXUS_DOC_SLUGS = new Set([
  'getting-started',
  'concepts',
  'architecture',
  'agents',
  'workflows',
  'integrations',
  'governance',
  'observability',
  'security',
  'api',
])

export function renderNexusDomain(req, res) {
  if (!NEXUS_DOMAIN_SLUGS.has(req.params.domain)) return sendNotFound(res)
  const name = titleCaseSlug(req.params.domain)
  const path = `/products/nexus-aos/solutions/${req.params.domain}`
  return sendMeta(res, {
    path,
    image: NEXUS_IMAGE,
    title: `Nexus AOS for ${name} | Agentic AI Solutions`,
    description: `Explore governed agent roles, workflows, oversight and enterprise integration patterns for Nexus AOS in ${name}.`,
  })
}

export function renderNexusDocs(req, res) {
  if (req.params.section && !NEXUS_DOC_SLUGS.has(req.params.section)) return sendNotFound(res)
  const name = titleCaseSlug(req.params.section || 'getting-started')
  const path = req.params.section
    ? `/products/nexus-aos/docs/${req.params.section}`
    : '/products/nexus-aos/docs'
  return sendMeta(res, {
    path,
    image: NEXUS_IMAGE,
    title: `${name} | Nexus AOS Documentation`,
    description: `Read the public ${name.toLowerCase()} documentation for Nexus AOS governed multi-agent orchestration.`,
    type: 'article',
  })
}

export async function renderProductDetail(req, res, next) {
  try {
    const product = await Product.findOne({ slug: req.params.slug, published: true }).lean()
    if (!product) return sendNotFound(res)
    return sendMeta(res, {
      path: `/products/${product.slug}`,
      title: product.seo?.metaTitle || product.name,
      description: product.seo?.metaDescription || product.summary,
      image: product.logoUrl,
    })
  } catch (err) {
    next(err)
  }
}

export async function renderInsightDetail(req, res, next) {
  try {
    const article = await Insight.findOne({ slug: req.params.slug, published: true }).lean()
    if (!article) return sendNotFound(res)
    return sendMeta(res, {
      path: `/insights/${article.slug}`,
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      image: article.coverImage,
      type: 'article',
    })
  } catch (err) {
    next(err)
  }
}

export async function renderPublicationDetail(req, res, next) {
  try {
    const publication = await Publication.findOne({ slug: req.params.slug, published: true }).lean()
    if (!publication) return sendNotFound(res)
    return sendMeta(res, {
      path: `/publications/${publication.slug}`,
      title: publication.seo?.metaTitle || publication.title,
      description: publication.seo?.metaDescription || publication.summary,
      image: publication.coverImage,
      type: 'article',
    })
  } catch (err) {
    next(err)
  }
}

export async function renderCourseDetail(req, res, next) {
  try {
    const course = await Course.findOne({ slug: req.params.slug, published: true }).lean()
    if (!course) return sendNotFound(res)
    return sendMeta(res, {
      path: `/courses/${course.slug}`,
      title: course.seo?.metaTitle || course.title,
      description: course.seo?.metaDescription || course.description || course.title,
      image: course.thumbnail,
    })
  } catch (err) {
    next(err)
  }
}
