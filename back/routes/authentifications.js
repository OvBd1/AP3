import { Router } from 'express'
import { login } from '../controllers/authentification.js'

let router = Router()

router.post('/login', login)

export default router