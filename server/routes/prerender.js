import { Router } from 'express'
import {
  renderHome,
  renderServices,
  renderProducts,
  renderProductDetail,
  renderCaseStudies,
  renderAbout,
  renderInsights,
  renderInsightDetail,
  renderPublications,
  renderPublicationDetail,
  renderCourses,
  renderCourseDetail,
  renderContact,
  renderCareers,
} from '../controllers/prerenderController.js'

const router = Router()

router.get('/', renderHome)
router.get('/services', renderServices)
router.get('/products', renderProducts)
router.get('/products/:slug', renderProductDetail)
router.get('/case-studies', renderCaseStudies)
router.get('/about', renderAbout)
router.get('/insights', renderInsights)
router.get('/insights/:slug', renderInsightDetail)
router.get('/publications', renderPublications)
router.get('/publications/:slug', renderPublicationDetail)
router.get('/courses', renderCourses)
router.get('/courses/:slug', renderCourseDetail)
router.get('/contact', renderContact)
router.get('/careers', renderCareers)

export default router
