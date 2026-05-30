import { Router } from 'express'
import { getInsights, getInsightBySlug } from '../controllers/insightsController.js'

const router = Router()
router.get('/',      getInsights)
router.get('/:slug', getInsightBySlug)
export default router
