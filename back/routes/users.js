import { Router } from 'express'
import { getAllUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/user.js'

const router = Router()

router.get('', getAllUsers)

router.get('/:id', getUser)

router.post("", addUser)

router.put('/:id', updateUser)

router.delete("/:id", deleteUser)

export default router