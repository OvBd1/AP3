import { Router } from 'express'
import { getAllcategories, getCategory } from '../controllers/category.js'

const router = Router()

router.get('/', getAllcategories)

router.get('/:id', getCategory)

export default router