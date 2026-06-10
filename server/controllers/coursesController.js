import Joi from 'joi'
import Course from '../models/Course.js'
import { parsePagination } from '../utils/pagination.js'

const COURSE_CATEGORIES = [
  'data-engineering',
  'machine-learning',
  'generative-ai',
  'agentic-ai',
  'software-engineering',
  'cloud-architecture',
  'advanced-analytics',
]

const courseSchema = Joi.object({
  title:       Joi.string().trim().min(2).max(200).required(),
  slug:        Joi.string().trim().max(220).allow('', null),
  description: Joi.string().trim().max(2000).allow('', null),
  category:    Joi.string().valid(...COURSE_CATEGORIES).required(),
  youtubeUrl:  Joi.string().trim().uri().required(),
  youtubeId:   Joi.string().trim().max(20).allow('', null),
  thumbnail:   Joi.string().trim().uri({ allowRelative: false }).allow('', null),
  instructor:  Joi.string().trim().max(120).allow('', null).default('RhemaAI Technologies'),
  duration:    Joi.string().trim().max(40).allow('', null),
  level:       Joi.string().valid('beginner', 'intermediate', 'advanced').default('intermediate'),
  tags:        Joi.array().items(Joi.string().trim().max(40)).max(16).default([]),
  pricing: Joi.object({
    isFree:     Joi.boolean().default(true),
    amount:     Joi.number().min(0).default(0),
    currency:   Joi.string().trim().uppercase().length(3).default('USD'),
    label:      Joi.string().trim().max(80).allow('', null).default('Free'),
    paymentUrl: Joi.string().trim().uri({ allowRelative: false }).allow('', null),
  }).default(),
  featured:    Joi.boolean().default(false),
  published:   Joi.boolean().default(false),
  publishedAt: Joi.date().allow('', null),
  seo: Joi.object({
    metaTitle:       Joi.string().trim().max(70).allow('', null),
    metaDescription: Joi.string().trim().max(170).allow('', null),
    canonicalUrl:    Joi.string().trim().uri({ allowRelative: true }).allow('', null),
    keywords:        Joi.array().items(Joi.string().trim().max(40)).max(16).default([]),
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

function extractYoutubeId(url = '') {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function normalizeCourse(value) {
  const id = extractYoutubeId(value.youtubeUrl || '')
  return {
    ...value,
    slug: slugify(value.slug || value.title),
    youtubeId: id || cleanOptional(value.youtubeId),
    thumbnail: cleanOptional(value.thumbnail) || (id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : undefined),
    description: cleanOptional(value.description),
    instructor: cleanOptional(value.instructor) || 'RhemaAI Technologies',
    duration: cleanOptional(value.duration),
    publishedAt: value.published
      ? cleanOptional(value.publishedAt) || new Date()
      : cleanOptional(value.publishedAt),
    seo: {
      metaTitle:       cleanOptional(value.seo?.metaTitle),
      metaDescription: cleanOptional(value.seo?.metaDescription),
      canonicalUrl:    cleanOptional(value.seo?.canonicalUrl),
      keywords:        value.seo?.keywords || [],
    },
  }
}

function validateCourse(req, res) {
  const { error, value } = courseSchema.validate(req.body, {
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

  return normalizeCourse(value)
}

// ── Public ──────────────────────────────────────────────────────
export async function getCourses(req, res, next) {
  try {
    const { category } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 12, maxLimit: 48 })
    const filter = { published: true }
    if (category && category !== 'all') filter.category = category

    const [courses, total] = await Promise.all([
      Course.find(filter)
        .select('-seo')
        .sort({ featured: -1, publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      Course.countDocuments(filter),
    ])

    res.json({ courses, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

// ── Admin ────────────────────────────────────────────────────────
export async function listAdminCourses(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 50, maxLimit: 200 })
    const [courses, total] = await Promise.all([
      Course.find().sort({ updatedAt: -1 }).skip(skip).limit(limit),
      Course.countDocuments(),
    ])
    res.json({ courses, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

export async function createAdminCourse(req, res, next) {
  try {
    const value = validateCourse(req, res)
    if (!value) return

    const course = await Course.create(value)
    res.status(201).json({ success: true, course })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A course with this slug already exists.' })
    }
    next(err)
  }
}

export async function updateAdminCourse(req, res, next) {
  try {
    const value = validateCourse(req, res)
    if (!value) return

    const course = await Course.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true })
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json({ success: true, course })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A course with this slug already exists.' })
    }
    next(err)
  }
}

export async function deleteAdminCourse(req, res, next) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json({ success: true, id: req.params.id })
  } catch (err) {
    next(err)
  }
}
