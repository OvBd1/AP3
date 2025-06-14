import { Router } from 'express'
import { getAllProducts, getProduct, addProduct, updateProduct, updateStock, deleteProduct } from '../controllers/product.js'

const router = Router()

router.get('/', getAllProducts)

router.get('/:id', getProduct)

router.post("", addProduct)

router.put('/:id', updateProduct)

router.put('/stock/:id', updateStock)

router.delete("/:id", deleteProduct)

export default router