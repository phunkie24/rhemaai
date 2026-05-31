import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './config/db.js'
import { validateEnv } from './config/env.js'
import app from './app.js'

const PORT = process.env.PORT || 5000

validateEnv()
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
