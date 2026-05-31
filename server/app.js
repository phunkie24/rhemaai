import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler.js'
import { rateLimiter } from './middleware/rateLimiter.js'
import contactRoutes from './routes/contact.js'
import newsletterRoutes from './routes/newsletter.js'
import insightsRoutes from './routes/insights.js'

const app = express()

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'))
}

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

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

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errorHandler)

export default app
