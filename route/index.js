

const express = require('express')
const router = express.Router();



const authRoute = require('./auth')
const userRoute = require('./user')
// const adminRoute = require('./admin')

const authMiddleWare = require('../middleware/authMiddleWare')

router.use('/user', authMiddleWare, userRoute)
router.use('/auth', authRoute)

module.exports = router