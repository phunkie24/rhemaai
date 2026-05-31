const REQUIRED_IN_PRODUCTION = ['MONGODB_URI', 'FRONTEND_URL', 'CONTACT_ADMIN_KEY']

export function validateEnv() {
  if (process.env.NODE_ENV !== 'production') return

  const missing = REQUIRED_IN_PRODUCTION.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required production environment variables: ${missing.join(', ')}`)
  }

  if (!/^https?:\/\//.test(process.env.FRONTEND_URL)) {
    throw new Error('FRONTEND_URL must include http:// or https://')
  }

  if (process.env.CONTACT_ADMIN_KEY.length < 24) {
    throw new Error('CONTACT_ADMIN_KEY must be at least 24 characters long')
  }
}
