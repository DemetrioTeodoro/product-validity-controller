const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('login', userController.sendLogin);

router.post('/user', userController.saveUser);

module.exports = app => app.use('/', router);