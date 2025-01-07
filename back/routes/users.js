import { Router } from 'express'
import bcrypt from 'bcrypt'
import db from '../db.config.js'
import { getAllUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/user.js'

const router = Router()

router.get('', getAllUsers)

router.get('/:id', getUser)

router.put("", addUser)

router.patch('/:id', updateUser)

router.delete("/:id", deleteUser)

export default router