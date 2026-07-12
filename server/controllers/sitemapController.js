import Product from '../models/Product.js'
import Insight from '../models/Insight.js'
import Publication from '../models/Publication.js'
import Course from '../models/Course.js'

const BASE = (process.env.FRONTEND_URL || 'https://rhemaaisolutions.tech').replace(/\/$/, '')

const STATIC_URLS = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/products', changefreq: 'weekly', priority: '0.8' },
  { path: '/publications', changefreq: 'weekly', priority: '0.8' },
  { path: '/insights', changefreq: 'weekly', priority: '0.7' },
  { path: '/courses', changefreq: 'weekly', priority: '0.7' },
  { path: '/case-studies', changefreq: 'monthly', priority: '0.7' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/careers', changefreq: 'monthly', priority: '0.5' },
  { path: '/contact', changefreq: 'yearly', priority: '0.5' },
]

function isoDate(value) {
  return new Date(value).toISOString().slice(0, 10)
}

function urlEntry({ path, changefreq, priority, lastmod }) {
  const lines = [
    '  <url>',
    `    <loc>${BASE}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].filter(Boolean)
  return lines.join('\n')
}

export async function getSitemap(req, res, next) {
  try {
    const [products, insights, publications, courses] = await Promise.all([
      Product.find({ published: true }).select('slug updatedAt').lean(),
      Insight.find({ published: true }).select('slug updatedAt').lean(),
      Publication.find({ published: true }).select('slug updatedAt').lean(),
      Course.find({ published: true }).select('slug updatedAt').lean(),
    ])

    const urls = [
      ...STATIC_URLS.map((entry) => urlEntry(entry)),
      ...products.map((p) => urlEntry({
        path: `/products/${p.slug}`, changefreq: 'monthly', priority: '0.6', lastmod: isoDate(p.updatedAt),
      })),
      ...insights.map((i) => urlEntry({
        path: `/insights/${i.slug}`, changefreq: 'monthly', priority: '0.6', lastmod: isoDate(i.updatedAt),
      })),
      ...publications.map((p) => urlEntry({
        path: `/publications/${p.slug}`, changefreq: 'monthly', priority: '0.6', lastmod: isoDate(p.updatedAt),
      })),
      ...courses.map((c) => urlEntry({
        path: `/courses/${c.slug}`, changefreq: 'monthly', priority: '0.6', lastmod: isoDate(c.updatedAt),
      })),
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

    res.set('Content-Type', 'application/xml; charset=utf-8')
    res.set('Cache-Control', 'public, max-age=1800')
    return res.send(xml)
  } catch (err) {
    next(err)
  }
}
