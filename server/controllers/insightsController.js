import Insight from '../models/Insight.js'

// GET /api/insights
export async function getInsights(req, res, next) {
  try {
    const { category, page = 1, limit = 9 } = req.query
    const filter = { published: true }
    if (category && category !== 'all') filter.category = category

    const [insights, total] = await Promise.all([
      Insight.find(filter)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .select('-content'),
      Insight.countDocuments(filter),
    ])

    return res.json({
      insights,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/insights/:slug
export async function getInsightBySlug(req, res, next) {
  try {
    const insight = await Insight.findOne({ slug: req.params.slug, published: true })
    if (!insight) return res.status(404).json({ message: 'Insight not found' })
    return res.json(insight)
  } catch (err) {
    next(err)
  }
}
