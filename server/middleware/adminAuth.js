export function requireAdmin(req, res, next) {
  if (process.env.NODE_ENV !== 'production') return next()

  const configuredKey = process.env.CONTACT_ADMIN_KEY
  const providedKey = req.get('x-admin-api-key')

  if (!configuredKey) {
    return res.status(503).json({ message: 'Admin access is not configured.' })
  }

  if (providedKey !== configuredKey) {
    return res.status(401).json({ message: 'Unauthorized.' })
  }

  return next()
}
