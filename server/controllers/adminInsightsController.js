import Joi from 'joi'
import Insight from '../models/Insight.js'
import { parsePagination } from '../utils/pagination.js'

const insightSchema = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),
  slug: Joi.string().trim().max(220).allow('', null),
  excerpt: Joi.string().trim().min(10).max(400).required(),
  content: Joi.string().trim().min(10).max(20000).required(),
  category: Joi.string().valid(
    'agentic-ai',
    'data-engineering',
    'data-science',
    'cloud-architecture',
    'mlops',
    'fintech',
    'enterprise-ai'
  ).required(),
  tags: Joi.array().items(Joi.string().trim().max(40)).max(12).default([]),
  coverImage: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  architectureImage: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  readTime: Joi.number().integer().min(1).max(120).default(5),
  published: Joi.boolean().default(false),
  publishedAt: Joi.date().allow('', null),
  author: Joi.object({
    name: Joi.string().trim().max(120).allow('', null),
    avatar: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  }).default({ name: 'RhemaAI Solutions Ltd Team' }),
  seo: Joi.object({
    metaTitle: Joi.string().trim().max(70).allow('', null),
    metaDescription: Joi.string().trim().max(170).allow('', null),
  }).default(),
})

function slugify(value = '') {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 220)
}

function cleanOptional(value) {
  return value === '' || value === null ? undefined : value
}

function normalizeInsight(value) {
  const now = new Date()
  return {
    ...value,
    slug: slugify(value.slug || value.title),
    coverImage: cleanOptional(value.coverImage),
    architectureImage: cleanOptional(value.architectureImage),
    publishedAt: value.published
      ? cleanOptional(value.publishedAt) || now
      : cleanOptional(value.publishedAt),
    author: {
      name: value.author?.name || 'RhemaAI Solutions Ltd Team',
      avatar: cleanOptional(value.author?.avatar),
    },
    seo: {
      metaTitle: cleanOptional(value.seo?.metaTitle),
      metaDescription: cleanOptional(value.seo?.metaDescription),
    },
  }
}

function validateInsight(req, res) {
  const { error, value } = insightSchema.validate(req.body, {
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

  return normalizeInsight(value)
}

export async function listAdminInsights(req, res, next) {
  try {
    const { category, published } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 30, maxLimit: 100 })

    const filter = {}
    if (category && category !== 'all') filter.category = category
    if (published === 'true') filter.published = true
    if (published === 'false') filter.published = false

    const [insights, total] = await Promise.all([
      Insight.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
      Insight.countDocuments(filter),
    ])

    return res.json({ insights, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

export async function createAdminInsight(req, res, next) {
  try {
    const value = validateInsight(req, res)
    if (!value) return

    const insight = await Insight.create(value)
    return res.status(201).json({ success: true, insight })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An article with this slug already exists.' })
    }
    next(err)
  }
}

export async function updateAdminInsight(req, res, next) {
  try {
    const value = validateInsight(req, res)
    if (!value) return

    const insight = await Insight.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    )
    if (!insight) return res.status(404).json({ message: 'Article not found' })
    return res.json({ success: true, insight })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An article with this slug already exists.' })
    }
    next(err)
  }
}

export async function deleteAdminInsight(req, res, next) {
  try {
    const insight = await Insight.findByIdAndDelete(req.params.id)
    if (!insight) return res.status(404).json({ message: 'Article not found' })
    return res.json({ success: true, id: req.params.id })
  } catch (err) {
    next(err)
  }
}
