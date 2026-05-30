import { Router } from 'express'
import { submitContact, getContacts } from '../controllers/contactController.js'

const router = Router()

router.post('/', submitContact)
router.get('/',  getContacts)   // Protect with auth middleware in production

export default router
