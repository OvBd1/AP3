import { Router } from 'express'
import { payment } from '../controllers/payment.js'

let router = Router()

router.post('', payment)

export default router