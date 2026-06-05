import dotenv from 'dotenv'
dotenv.config()

import swaggerUi from 'swagger-ui-express'
import { connectDB } from './config/db.js'
import { validateEnv } from './config/env.js'
import { swaggerSpec } from './config/swagger.js'
import app from './app.js'

const PORT = process.env.PORT || 5000

validateEnv()

// Mount Swagger here (index.js only) — keeps app.js test-safe
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'RhemaAI API Docs',
  customCss: '.swagger-ui .topbar { background: #12082A; }',
}))
app.get('/api/docs.json', (req, res) => res.json(swaggerSpec))

await connectDB()

const server = app.listen(PORT, () => {
  console.log(`RhemaAI Solutions Ltd API running on port ${PORT} [${process.env.NODE_ENV}]`)
})

function shutdown(signal) {
  console.log(`${signal} received. Closing HTTP server...`)
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
