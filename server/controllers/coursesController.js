import Course from '../models/Course.js'
import { parsePagination } from '../utils/pagination.js'

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

function withYoutubeFields(data) {
  const id = extractYoutubeId(data.youtubeUrl || '')
  return {
    ...data,
    youtubeId: id || data.youtubeId,
    thumbnail: data.thumbnail || (id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : ''),
  }
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
    const payload = withYoutubeFields(req.body)
    if (payload.published && !payload.publishedAt) payload.publishedAt = new Date()
    const course = await Course.create(payload)
    res.status(201).json({ course })
  } catch (err) {
    next(err)
  }
}

export async function updateAdminCourse(req, res, next) {
  try {
    const payload = withYoutubeFields(req.body)
    if (payload.published && !payload.publishedAt) payload.publishedAt = new Date()
    const course = await Course.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json({ course })
  } catch (err) {
    next(err)
  }
}

export async function deleteAdminCourse(req, res, next) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json({ message: 'Course deleted' })
  } catch (err) {
    next(err)
  }
}
