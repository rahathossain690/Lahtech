

const express = require('express')

const Router = express.Router();

const {signup} = require('../controller/user/user.controller')

Router.get('/', signup)