import Joi from 'joi'
import CaseStudy from '../models/CaseStudy.js'
import { parsePagination } from '../utils/pagination.js'

const caseStudySchema = Joi.object({
  title: Joi.string().trim().min(2).max(180).required(),
  slug: Joi.string().trim().max(200).allow('', null),
  industry: Joi.string().trim().min(2).max(80).required(),
  client: Joi.string().trim().min(2).max(160).required(),
  kpi1: Joi.object({
    value: Joi.string().trim().max(40).required(),
    label: Joi.string().trim().max(80).required(),
  }).required(),
  kpi2: Joi.object({
    value: Joi.string().trim().max(40).required(),
    label: Joi.string().trim().max(80).required(),
  }).required(),
  summary: Joi.string().trim().min(10).max(500).required(),
  body: Joi.string().trim().max(10000).allow('', null),
  tags: Joi.array().items(Joi.string().trim().max(40)).max(12).default([]),
  accent: Joi.string().trim().max(24).allow('', null).default('#9B6DFF'),
  coverImage: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  featured: Joi.boolean().default(false),
  published: Joi.boolean().default(false),
  publishedAt: Joi.date().allow('', null),
  seo: Joi.object({
    metaTitle: Joi.string().trim().max(70).allow('', null),
    metaDescription: Joi.string().trim().max(170).allow('', null),
    canonicalUrl: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
    keywords: Joi.array().items(Joi.string().trim().max(40)).max(16).default([]),
  }).default(),
})

function slugify(value = '') {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200)
}

function cleanOptional(value) {
  return value === '' || value === null ? undefined : value
}

function normalizeCaseStudy(value) {
  const now = new Date()
  return {
    ...value,
    slug: slugify(value.slug || value.title),
    body: cleanOptional(value.body),
    coverImage: cleanOptional(value.coverImage),
    accent: cleanOptional(value.accent) || '#9B6DFF',
    publishedAt: value.published
      ? cleanOptional(value.publishedAt) || now
      : cleanOptional(value.publishedAt),
    seo: {
      metaTitle: cleanOptional(value.seo?.metaTitle),
      metaDescription: cleanOptional(value.seo?.metaDescription),
      canonicalUrl: cleanOptional(value.seo?.canonicalUrl),
      keywords: value.seo?.keywords || [],
    },
  }
}

function validateCaseStudy(req, res) {
  const { error, value } = caseStudySchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  if (error) {
    res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((d) => d.message),
    })
    return null
  }

  return normalizeCaseStudy(value)
}

export async function getCaseStudies(req, res, next) {
  try {
    const { industry } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 12, maxLimit: 48 })

    const filter = { published: true }
    if (industry && industry !== 'all') filter.industry = industry

    const [caseStudies, total] = await Promise.all([
      CaseStudy.find(filter)
        .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      CaseStudy.countDocuments(filter),
    ])

    return res.json({ caseStudies, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

export async function listAdminCaseStudies(req, res, next) {
  try {
    const { industry, published } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 30, maxLimit: 100 })

    const filter = {}
    if (industry && industry !== 'all') filter.industry = industry
    if (published === 'true') filter.published = true
    if (published === 'false') filter.published = false

    const [caseStudies, total] = await Promise.all([
      CaseStudy.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
      CaseStudy.countDocuments(filter),
    ])

    return res.json({ caseStudies, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

export async function createAdminCaseStudy(req, res, next) {
  try {
    const value = validateCaseStudy(req, res)
    if (!value) return

    const caseStudy = await CaseStudy.create(value)
    return res.status(201).json({ success: true, caseStudy })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A case study with this slug already exists.' })
    }
    next(err)
  }
}

export async function updateAdminCaseStudy(req, res, next) {
  try {
    const value = validateCaseStudy(req, res)
    if (!value) return

    const caseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    )
    if (!caseStudy) return res.status(404).json({ message: 'Case study not found' })
    return res.json({ success: true, caseStudy })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A case study with this slug already exists.' })
    }
    next(err)
  }
}

export async function deleteAdminCaseStudy(req, res, next) {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id)
    if (!caseStudy) return res.status(404).json({ message: 'Case study not found' })
    return res.json({ success: true, id: req.params.id })
  } catch (err) {
    next(err)
  }
}
