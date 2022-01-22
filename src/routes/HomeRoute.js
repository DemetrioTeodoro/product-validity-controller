const express = require('express');
const router = express.Router();

const homeController = require('../controllers/HomeController');

router.get('/', homeController.sendHome);

module.exports = app => app.use('/home', router);