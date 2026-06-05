import Joi from 'joi'
import Product from '../models/Product.js'
import { parsePagination } from '../utils/pagination.js'

const PRODUCT_CATEGORIES = new Set(['saas', 'platform', 'tool', 'accelerator', 'api', 'template', 'all'])

const productSchema = Joi.object({
  name: Joi.string().trim().min(2).max(160).required(),
  slug: Joi.string().trim().max(180).allow('', null),
  kicker: Joi.string().trim().max(80).allow('', null),
  category: Joi.string().valid('saas', 'platform', 'tool', 'accelerator', 'api', 'template').default('saas'),
  summary: Joi.string().trim().min(10).max(360).required(),
  description: Joi.string().trim().max(6000).allow('', null),
  tags: Joi.array().items(Joi.string().trim().max(40)).max(12).default([]),
  logoUrl: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  assetUrl: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  demoUrl: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  productUrl: Joi.string().trim().uri({ allowRelative: true }).allow('', null),
  version: Joi.string().trim().max(40).allow('', null).default('1.0.0'),
  pricing: Joi.object({
    amount: Joi.number().min(0).default(0),
    currency: Joi.string().trim().uppercase().length(3).default('USD'),
    label: Joi.string().trim().max(80).allow('', null).default('Contact sales'),
  }).default(),
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
    .slice(0, 180)
}

function cleanOptional(value) {
  return value === '' || value === null ? undefined : value
}

function normalizeProduct(value) {
  const now = new Date()
  return {
    ...value,
    slug: slugify(value.slug || value.name),
    kicker: cleanOptional(value.kicker),
    description: cleanOptional(value.description),
    logoUrl: cleanOptional(value.logoUrl),
    assetUrl: cleanOptional(value.assetUrl),
    demoUrl: cleanOptional(value.demoUrl),
    productUrl: cleanOptional(value.productUrl),
    version: cleanOptional(value.version) || '1.0.0',
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

function validateProduct(req, res) {
  const { error, value } = productSchema.validate(req.body, {
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

  return normalizeProduct(value)
}

export async function getProducts(req, res, next) {
  try {
    const { category } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 12, maxLimit: 48 })

    if (category && !PRODUCT_CATEGORIES.has(category)) {
      return res.status(400).json({ message: 'Invalid product category.' })
    }

    const filter = { published: true }
    if (category && category !== 'all') filter.category = category

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ])

    return res.json({ products, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

export async function listAdminProducts(req, res, next) {
  try {
    const { category, published } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 30, maxLimit: 100 })

    const filter = {}
    if (category && category !== 'all') filter.category = category
    if (published === 'true') filter.published = true
    if (published === 'false') filter.published = false

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ])

    return res.json({ products, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

export async function createAdminProduct(req, res, next) {
  try {
    const value = validateProduct(req, res)
    if (!value) return

    const product = await Product.create(value)
    return res.status(201).json({ success: true, product })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A product with this slug already exists.' })
    }
    next(err)
  }
}

export async function updateAdminProduct(req, res, next) {
  try {
    const value = validateProduct(req, res)
    if (!value) return

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    )
    if (!product) return res.status(404).json({ message: 'Product not found' })
    return res.json({ success: true, product })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A product with this slug already exists.' })
    }
    next(err)
  }
}

export async function deleteAdminProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    return res.json({ success: true, id: req.params.id })
  } catch (err) {
    next(err)
  }
}
