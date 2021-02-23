const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'public/uploads' });

const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getProducts);

router.post('/', upload.single('products'), productController.createProduct);

router
  .get('/:id', productController.getProduct)
  .patch('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct);
module.exports = router;
