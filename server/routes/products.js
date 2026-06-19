import { Router } from 'express'
import { getProductBySlug, getProducts } from '../controllers/productsController.js'

const router = Router()

/**
 * @openapi
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: List published products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 9 }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated products list
 */
router.get('/', getProducts)
router.get('/:slug', getProductBySlug)

export default router
