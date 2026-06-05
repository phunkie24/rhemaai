import { Router } from 'express'
import { subscribe } from '../controllers/newsletterController.js'
import { newsletterLimiter } from '../middleware/rateLimiter.js'

const router = Router()
router.post('/', newsletterLimiter, subscribe)
export default router
