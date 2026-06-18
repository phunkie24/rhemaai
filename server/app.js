import express from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler.js'
import { rateLimiter } from './middleware/rateLimiter.js'
import contactRoutes from './routes/contact.js'
import newsletterRoutes from './routes/newsletter.js'
import insightsRoutes from './routes/insights.js'
import publicationsRoutes from './routes/publications.js'
import productsRoutes from './routes/products.js'
import caseStudiesRoutes from './routes/caseStudies.js'
import coursesRoutes from './routes/courses.js'
import adminRoutes from './routes/admin.js'
import webhookRoutes from './routes/webhooks.js'

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))
app.use(cors({
  origin(origin, callback) {
    const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
      .split(',').map((o) => o.trim()).filter(Boolean)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-api-key', 'x-file-name', 'x-paystack-signature'],
}))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'))
}

// Webhook route must be registered BEFORE express.json() so the raw body
// buffer is preserved for Paystack HMAC signature verification.
app.use('/api/webhooks', webhookRoutes)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use('/api/uploads', express.static(path.join(process.cwd(), 'uploads'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
}))

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RhemaAI Solutions Ltd API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

app.use('/api/', rateLimiter)

app.use('/api/contact', contactRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/insights', insightsRoutes)
app.use('/api/publications', publicationsRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/case-studies', caseStudiesRoutes)
app.use('/api/courses', coursesRoutes)
app.use('/api/admin', adminRoutes)

// Swagger UI — dynamic import keeps swagger-jsdoc out of Jest's module graph
if (process.env.NODE_ENV !== 'test') {
  const { default: swaggerUi } = await import('swagger-ui-express')
  const { swaggerSpec }        = await import('./config/swagger.js')
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'RhemaAI API Docs',
    customCss: '.swagger-ui .topbar { background: #12082A; }',
  }))
  app.get('/api/docs.json', (req, res) => res.json(swaggerSpec))
}

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errorHandler)

export default app
