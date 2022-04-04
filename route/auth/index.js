

const router = require('express').Router();

const authController = require('../../controller/user/auth.controller')


router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.get('/verify-email', authController.verifyEmail)
router.post('/forgot-password', authController.forgotPassword)
router.post('/confirm-forgot-password', authController.confirmForgotPassword)

module.exports = router