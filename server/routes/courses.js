import { Router } from 'express'
import { getCourses } from '../controllers/coursesController.js'

const router = Router()

/**
 * @openapi
 * /courses:
 *   get:
 *     tags: [Courses]
 *     summary: List published courses
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [all, data-engineering, machine-learning, generative-ai, agentic-ai, software-engineering, cloud-architecture, advanced-analytics]
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 12 }
 *     responses:
 *       200:
 *         description: Paginated courses list
 */
router.get('/', getCourses)

export default router
