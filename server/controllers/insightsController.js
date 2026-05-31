import Insight from '../models/Insight.js'
import { parsePagination } from '../utils/pagination.js'

const INSIGHT_CATEGORIES = new Set([
  'agentic-ai',
  'data-engineering',
  'data-science',
  'cloud-architecture',
  'mlops',
  'fintech',
  'enterprise-ai',
  'all',
])

export async function getInsights(req, res, next) {
  try {
    const { category } = req.query
    const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 9, maxLimit: 24 })

    if (category && !INSIGHT_CATEGORIES.has(category)) {
      return res.status(400).json({ message: 'Invalid insight category.' })
    }

    const filter = { published: true }
    if (category && category !== 'all') filter.category = category

    const [insights, total] = await Promise.all([
      Insight.find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content'),
      Insight.countDocuments(filter),
    ])

    return res.json({
      insights,
      total,
      page,
      pages: Math.ceil(total / limit),
    })
  } catch (err) {
    next(err)
  }
}

export async function getInsightBySlug(req, res, next) {
  try {
    const insight = await Insight.findOne({ slug: req.params.slug, published: true })
    if (!insight) return res.status(404).json({ message: 'Insight not found' })
    return res.json(insight)
  } catch (err) {
    next(err)
  }
}
