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

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'))
}

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use('/api/', rateLimiter)

app.use('/api/contact',    contactRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/insights',   insightsRoutes)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RhemaAI Technologies API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errorHandler)

export default app
