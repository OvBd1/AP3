const express = require('express')
const router = express.Router()
const medsController = require('../controllers/medsController')

router.use('/login', loginController)

module.exports = router