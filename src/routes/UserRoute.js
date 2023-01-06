const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('', userController.sendLogin);

router.post('/verifyUser', userController.verifyUser);

router.post('/saveUser', userController.saveOrUpdateUser);

router.get('/registerNewUser', userController.sendSaveNewUser);


module.exports = app => app.use('/', router);