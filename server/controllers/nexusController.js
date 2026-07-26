import Joi from 'joi'
import nodemailer from 'nodemailer'
import NexusEnquiry from '../models/NexusEnquiry.js'

const optionalText = (max) => Joi.string().trim().max(max).allow('', null)

const demoSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required(),
  workEmail: Joi.string().trim().email().max(180).required(),
  company: Joi.string().trim().min(2).max(160).required(),
  jobTitle: optionalText(120),
  country: optionalText(100),
  organisationSize: Joi.string().valid('1-49', '50-249', '250-999', '1000-4999', '5000+', 'not-specified').default('not-specified'),
  industry: optionalText(120),
  primaryUseCase: Joi.string().trim().min(20).max(1000).required(),
  aiMaturity: Joi.string().valid('exploring', 'prototyping', 'piloting', 'operational', 'scaling', 'not-specified').default('not-specified'),
  cloudEnvironment: Joi.string().valid('azure', 'aws', 'gcp', 'multi-cloud', 'private-cloud', 'hybrid', 'on-premises', 'not-specified').default('not-specified'),
  requiredIntegrations: optionalText(600),
  deploymentOption: Joi.string().valid('azure', 'customer-kubernetes', 'private-cloud', 'hybrid', 'dedicated', 'unsure').default('unsure'),
  timeline: Joi.string().valid('0-3-months', '3-6-months', '6-12-months', '12-plus-months', 'exploring').default('exploring'),
  additionalContext: optionalText(1600),
  interest: Joi.string().valid(
    'demo',
    'readiness-assessment',
    'workflow-discovery',
    'starter-pilot',
    'standard-pilot',
    'advanced-pilot',
    'department',
    'business',
    'enterprise',
    'implementation-services',
    'training',
    'managed-services',
    'other'
  ).default('demo'),
  indicativeBudget: Joi.string().valid(
    'under-10k',
    '10k-25k',
    '25k-50k',
    '50k-100k',
    '100k-250k',
    '250k-500k',
    'above-500k',
    'not-defined'
  ).default('not-defined'),
  engagement: Joi.string().valid('demo', 'discovery', 'pilot', 'enterprise').optional(),
  consent: Joi.boolean().valid(true).required(),
  website: optionalText(200),
})

const assessmentSchema = Joi.object({
  fullName: optionalText(100),
  workEmail: Joi.string().trim().email().max(180).required(),
  company: optionalText(160),
  assessmentScore: Joi.number().integer().min(0).max(100).required(),
  assessmentBand: Joi.string().valid('Foundation Required', 'Emerging', 'Pilot Ready', 'Scale Ready', 'Advanced').required(),
  dimensionScores: Joi.array().items(Joi.object({
    slug: Joi.string().trim().max(80).required(),
    name: Joi.string().trim().max(120).required(),
    score: Joi.number().integer().min(0).max(100).required(),
  })).length(12).required(),
  consent: Joi.boolean().valid(true).required(),
  website: optionalText(200),
})

function cleanOptional(value) {
  return value === '' || value === null ? undefined : value
}

function cleanObject(value) {
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== 'website')
      .map(([key, item]) => [key, typeof item === 'string' ? cleanOptional(item) : item])
      .filter(([, item]) => item !== undefined)
  )
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function emailEnabled() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
}

function createTransporter() {
  const port = Number(process.env.EMAIL_PORT || 465)
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port,
    secure: port === 465,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  })
}

async function sendEmails(messages) {
  if (!emailEnabled()) return
  const transporter = createTransporter()
  await Promise.allSettled(messages.map((message) => transporter.sendMail(message)))
}

function validate(schema, body, res) {
  const { error, value } = schema.validate(body, { abortEarly: false, stripUnknown: true })
  if (error) {
    res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message),
    })
    return null
  }
  return value
}

export async function submitNexusDemo(req, res, next) {
  try {
    const value = validate(demoSchema, req.body, res)
    if (!value) return

    // Honeypot: acknowledge without persisting or emailing.
    if (value.website) {
      return res.status(201).json({ success: true, message: 'Your request has been received.' })
    }

    const saved = await NexusEnquiry.create({
      ...cleanObject(value),
      kind: 'demo',
      ipAddress: req.ip,
    })
    const owner = process.env.NOTIFY_EMAIL || process.env.EMAIL_USER
    const safeName = escapeHtml(value.fullName)
    const safeEmail = escapeHtml(value.workEmail)
    const safeCompany = escapeHtml(value.company)
    const safeUseCase = escapeHtml(value.primaryUseCase)

    await sendEmails([
      {
        from: `"RhemaAI Nexus Website" <${process.env.EMAIL_USER}>`,
        to: owner,
        replyTo: value.workEmail,
        subject: `Nexus AOS ${value.interest} request — ${value.company}`,
        html: `<h2>New Nexus AOS request</h2><p><strong>${safeName}</strong> (${safeEmail}) from ${safeCompany}</p><p><strong>Interest:</strong> ${escapeHtml(value.interest)}</p><p><strong>Indicative budget:</strong> ${escapeHtml(value.indicativeBudget)}</p><p><strong>Primary use case:</strong></p><p>${safeUseCase}</p>`,
      },
      {
        from: `"RhemaAI Solutions Ltd" <${process.env.EMAIL_USER}>`,
        to: value.workEmail,
        subject: 'We received your Nexus AOS request',
        html: `<h2>Thank you, ${escapeHtml(value.fullName.split(' ')[0])}</h2><p>We have received your Nexus AOS request. Our team will review the use case, systems, governance needs and deployment context before arranging the next step.</p><p>Do not send credentials or confidential production data by email.</p>`,
      },
    ])

    return res.status(201).json({
      success: true,
      message: 'Your Nexus AOS request has been received.',
      id: saved._id,
    })
  } catch (error) {
    next(error)
  }
}

export async function submitAssessmentCopy(req, res, next) {
  try {
    const value = validate(assessmentSchema, req.body, res)
    if (!value) return

    if (value.website) {
      return res.status(201).json({ success: true, message: 'Your assessment summary has been requested.' })
    }

    const saved = await NexusEnquiry.create({
      ...cleanObject(value),
      kind: 'assessment',
      ipAddress: req.ip,
    })
    const rows = value.dimensionScores
      .map((dimension) => `<li>${escapeHtml(dimension.name)}: ${dimension.score}/100</li>`)
      .join('')

    await sendEmails([{
      from: `"RhemaAI Solutions Ltd" <${process.env.EMAIL_USER}>`,
      to: value.workEmail,
      subject: `Your Nexus AOS readiness summary — ${value.assessmentBand}`,
      html: `<h2>Nexus AOS readiness summary</h2><p>Your deterministic self-assessment score is <strong>${value.assessmentScore}/100 — ${escapeHtml(value.assessmentBand)}</strong>.</p><ul>${rows}</ul><p>This is a planning aid, not a certification, regulatory opinion or guaranteed technical assessment.</p><p><a href="https://rhemaaisolutions.tech/products/nexus-aos/demo">Discuss the recommended next step</a></p>`,
    }])

    return res.status(201).json({
      success: true,
      message: 'Your assessment summary has been requested.',
      id: saved._id,
    })
  } catch (error) {
    next(error)
  }
}
