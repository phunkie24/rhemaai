import { Router } from 'express'
import { submitContact, getContacts } from '../controllers/contactController.js'
import { requireAdmin } from '../middleware/adminAuth.js'
import { contactLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/', contactLimiter, submitContact)
router.get('/', requireAdmin, getContacts)

export default router
