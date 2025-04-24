import { Router } from 'express'
import { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../controllers/product.js'

const router = Router()

router.get('/', getAllProducts)

router.get('/:id', getProduct)

router.post("", addProduct)

router.put('/:id', updateProduct)

router.delete("/:id", deleteProduct)

export default router