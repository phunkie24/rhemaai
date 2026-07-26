import { Router } from 'express'
import { nexusLimiter } from '../middleware/rateLimiter.js'
import {
  submitAssessmentCopy,
  submitNexusDemo,
} from '../controllers/nexusController.js'

const router = Router()

router.post('/demo', nexusLimiter, submitNexusDemo)
router.post('/assessment', nexusLimiter, submitAssessmentCopy)

export default router
