const express = require('express')
const authCtrl = require('../controllers/authentification')

let router = express.Router()

router.post('/login', authCtrl.login)

module.exports = router