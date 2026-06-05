import { Router } from 'express'
import { getPublicationBySlug, getPublications } from '../controllers/publicationsController.js'

const router = Router()

router.get('/', getPublications)
router.get('/:slug', getPublicationBySlug)

export default router
