const express = require('express');
const router = express.Router();

const registerController = require('../controllers/UserController.js');

router.get('/', registerController.sendLogin);

module.exports = app => app.use('/register', router);