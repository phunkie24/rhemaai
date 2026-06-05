import { Router } from 'express'
import { getCaseStudies } from '../controllers/caseStudiesController.js'

const router = Router()

router.get('/', getCaseStudies)

export default router
