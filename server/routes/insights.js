import { Router } from 'express'
import { getInsights, getInsightBySlug } from '../controllers/insightsController.js'

const router = Router()

/**
 * @openapi
 * /insights:
 *   get:
 *     tags: [Insights]
 *     summary: List published insights
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 9 }
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [all, agentic-ai, data-engineering, data-science, cloud-architecture, mlops, fintech, enterprise-ai]
 *     responses:
 *       200:
 *         description: Paginated insights list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedInsights'
 * /insights/{slug}:
 *   get:
 *     tags: [Insights]
 *     summary: Get a single insight by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *         example: building-agentic-ai-systems
 *     responses:
 *       200:
 *         description: Insight detail with full content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insight'
 *       404:
 *         description: Insight not found
 */
router.get('/',      getInsights)
router.get('/:slug', getInsightBySlug)
export default router
