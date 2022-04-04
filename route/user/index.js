


const router = require('express').Router();

const userController = require('../../controller/user/user.controller')


router.get('/', userController.getUser)

module.exports = router