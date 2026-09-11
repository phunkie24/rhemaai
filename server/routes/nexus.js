import { Router } from 'express'
import { nexusLimiter } from '../middleware/rateLimiter.js'
import { formHoneypot } from '../utils/formGuard.js'
import {
  submitAssessmentCopy,
  submitNexusDemo,
} from '../controllers/nexusController.js'

const router = Router()

router.post('/demo', nexusLimiter, formHoneypot, submitNexusDemo)
router.post('/assessment', nexusLimiter, formHoneypot, submitAssessmentCopy)

export default router
