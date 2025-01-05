const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db.config.js')
const userCtrl = require('../controllers/user')

const router = express.Router()

router.get('', userCtrl.getAllUsers)

router.get('/:id', userCtrl.getUser)

router.put("", userCtrl.addUser)

router.patch('/:id', userCtrl.updateUser)

router.delete("/:id", userCtrl.deleteUser)

module.exports = router