const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

router.get('/', productController.sendProducts);

router.get('/findById/:id', productController.findProductById);

router.post('/', productController.saveOrUpdateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = app => app.use('/product', router);