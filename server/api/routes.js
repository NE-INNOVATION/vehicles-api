const express = require('express')
const vehicleRoutes = require('./vehicles').routes

const router = express.Router({mergeParams: true})
router.use('/vehicles', vehicleRoutes)

module.exports = router