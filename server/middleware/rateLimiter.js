import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: {
    message: 'Too many requests from this IP. Please try again in 15 minutes.',
  },
})

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  skip: () => process.env.NODE_ENV === 'test',
  message: {
    message: 'Too many contact form submissions. Please try again in an hour.',
  },
})
