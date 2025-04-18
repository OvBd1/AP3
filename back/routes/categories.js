import { Router } from 'express'
import { getAllcategories } from '../controllers/category.js'

const router = Router()

router.get('/', getAllcategories)

export default router