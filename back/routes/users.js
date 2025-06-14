import { Router } from 'express'
import { getAllUsers, getUser, getUserAuthenticated, addUser, updateUser, deleteUser } from '../controllers/user.js'

const router = Router()

router.get('', getAllUsers)

router.get('/one/:id', getUser)

router.get('/me', getUserAuthenticated)

router.post('', addUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

export default router