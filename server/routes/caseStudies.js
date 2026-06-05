import { Router } from 'express'
import { getCaseStudies } from '../controllers/caseStudiesController.js'

const router = Router()

/**
 * @openapi
 * /case-studies:
 *   get:
 *     tags: [Case Studies]
 *     summary: List published case studies
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 9 }
 *       - in: query
 *         name: industry
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated case studies list
 */
router.get('/', getCaseStudies)

export default router
