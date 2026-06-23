import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import Joi from 'joi'
import Publication from '../models/Publication.js'
import { parsePagination } from '../utils/pagination.js'

const PUBLICATION_TYPES = new Set(['book', 'whitepaper', 'all'])
const uploadsDir = path.join(process.cwd(), 'uploads')
const allowedUploadTypes = new Map([
  ['application/pdf', '.pdf'],
  ['application/msword', '.doc'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.docx'],
  ['image/png', '.png'],
  ['image/jpeg', '.jpg'],
  ['image/webp', '.webp'],
  ['image/svg+xml', '.svg'],
  ['application/zip', '.zip'],
  ['application/x-zip-compressed', '.zip'],
  ['text/markdown', ''],
  ['text/plain', ''],
  ['application/octet-stream', ''],
])

const publicationSchema = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),
  slug: Joi.string().trim().max(220).allow('', null),
  type: Joi.string().valid('book', 'whitepaper').required(),
  summary: Joi.string().trim().min(10).max(500).required(),
  body: Joi.string().trim().max(10000).allow('', null),
  coverImage: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  documentUrl: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  documentLabel: Joi.string().trim().max(120).allow('', null),
  tags: Joi.array().items(Joi.string().trim().max(40)).max(12).default([]),
  price: Joi.object({
    amount:     Joi.number().min(0).default(0),
    amountNGN:  Joi.number().min(0).default(0),
    currency:   Joi.string().trim().uppercase().length(3).default('USD'),
    label:      Joi.string().trim().max(80).allow('', null).default('Free'),
    paystackUrl: Joi.string().trim().uri({ allowRelative: false }).allow('', null),
    kindleUrl:  Joi.string().trim().uri({ allowRelative: false }).allow('', null),
    paymentUrl: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  }).default(),
  featured: Joi.boolean().default(false),
  published: Joi.boolean().default(false),
  publishedAt: Joi.date().allow('', null),
  author: Joi.object({
    name: Joi.string().trim().max(120).allow('', null),
  }).default({ name: 'RhemaAI Solutions Ltd' }),
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
    .slice(0, 220)
}

function stripDocumentIfPaid(publication) {
  const pub = publication.toObject ? publication.toObject() : { ...publication }
  if ((pub.price?.amount > 0) || (pub.price?.amountNGN > 0)) {
    delete pub.documentUrl
  }
  return pub
}

function cleanOptional(value) {
  return value === '' || value === null ? undefined : value
}

function normalizePublication(value) {
  const now = new Date()
  return {
    ...value,
    slug: slugify(value.slug || value.title),
    body: cleanOptional(value.body),
    coverImage: cleanOptional(value.coverImage),
    documentUrl: cleanOptional(value.documentUrl),
    documentLabel: cleanOptional(value.documentLabel),
    publishedAt: value.published
      ? cleanOptional(value.publishedAt) || now
      : cleanOptional(value.publishedAt),
    author: {
      name: value.author?.name || 'RhemaAI Solutions Ltd',
    },
    seo: {
      metaTitle: cleanOptional(value.seo?.metaTitle),
      metaDescription: cleanOptional(value.seo?.metaDescription),
      canonicalUrl: cleanOptional(value.seo?.canonicalUrl),
      keywords: value.seo?.keywords || [],
    },
  }
}

function validatePublication(req, res) {
  const { error, value } = publicationSchema.validate(req.body, {
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

  return normalizePublication(value)
}

export async function getPublications(req, res, next) {
  try {
    const { type } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 12, maxLimit: 48 })

    if (type && !PUBLICATION_TYPES.has(type)) {
      return res.status(400).json({ message: 'Invalid publication type.' })
    }

    const filter = { published: true, type: { $in: ['book', 'whitepaper'] } }
    if (type && type !== 'all') filter.type = type

    const [publications, total] = await Promise.all([
      Publication.find(filter)
        .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-body'),
      Publication.countDocuments(filter),
    ])

    return res.json({
      publications: publications.map(stripDocumentIfPaid),
      total,
      page,
      pages: Math.ceil(total / limit),
    })
  } catch (err) {
    next(err)
  }
}

export async function getPublicationBySlug(req, res, next) {
  try {
    const publication = await Publication.findOne({
      slug: req.params.slug,
      published: true,
      type: { $in: ['book', 'whitepaper'] },
    })
    if (!publication) return res.status(404).json({ message: 'Publication not found' })
    return res.json(stripDocumentIfPaid(publication))
  } catch (err) {
    next(err)
  }
}

export async function listAdminPublications(req, res, next) {
  try {
    const { type, published } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 30, maxLimit: 100 })

    const filter = { type: { $in: ['book', 'whitepaper'] } }
    if (type && type !== 'all') filter.type = type
    if (published === 'true') filter.published = true
    if (published === 'false') filter.published = false

    const [publications, total] = await Promise.all([
      Publication.find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      Publication.countDocuments(filter),
    ])

    return res.json({ publications, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

export async function createAdminPublication(req, res, next) {
  try {
    const value = validatePublication(req, res)
    if (!value) return

    const publication = await Publication.create(value)
    return res.status(201).json({ success: true, publication })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A publication with this slug already exists.' })
    }
    next(err)
  }
}

export async function updateAdminPublication(req, res, next) {
  try {
    const value = validatePublication(req, res)
    if (!value) return

    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    )
    if (!publication) return res.status(404).json({ message: 'Publication not found' })
    return res.json({ success: true, publication })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A publication with this slug already exists.' })
    }
    next(err)
  }
}

export async function deleteAdminPublication(req, res, next) {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id)
    if (!publication) return res.status(404).json({ message: 'Publication not found' })
    return res.json({ success: true, id: req.params.id })
  } catch (err) {
    next(err)
  }
}

export async function uploadAdminAsset(req, res, next) {
  try {
    if (!req.body?.length) {
      return res.status(400).json({ message: 'No file was uploaded.' })
    }

    const mimeType = req.get('content-type') || 'application/octet-stream'
    if (!allowedUploadTypes.has(mimeType)) {
      return res.status(415).json({ message: 'Unsupported file type.' })
    }

    const originalName = req.get('x-file-name') || 'asset'
    const parsed = path.parse(originalName)
    const requestedExt = parsed.ext.toLowerCase()
    const allowedExt = allowedUploadTypes.get(mimeType)
    const extension = allowedExt || requestedExt
    const allowedExtensions = new Set(['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.zip', '.md', '.markdown', '.txt'])

    if (!allowedExtensions.has(extension)) {
      return res.status(415).json({ message: 'Unsupported file extension.' })
    }

    const safeBase = slugify(parsed.name || 'asset') || 'asset'
    const fileName = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${safeBase}${extension}`
    const filePath = path.join(uploadsDir, fileName)

    await fs.mkdir(uploadsDir, { recursive: true })
    await fs.writeFile(filePath, req.body)

    return res.status(201).json({
      success: true,
      asset: {
        url: `/api/uploads/${fileName}`,
        originalName,
        fileName,
        mimeType,
        size: req.body.length,
      },
    })
  } catch (err) {
    next(err)
  }
}
