const express = require('express')
const router = express.Router()
const medsController = require('../controllers/medsController')

router.get('/meds', medsController.getAllMeds)
router.post('/meds/add', medsController.addMed)
router.delete('/meds/delete/:id', medsController.deleteMed)
router.put('/meds/update/:id', medsController.updateMed)

module.exports = router