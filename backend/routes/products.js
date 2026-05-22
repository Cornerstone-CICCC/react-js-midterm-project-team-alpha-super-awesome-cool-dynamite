// CARLOS: Product Routes
// Defines endpoints for creating, reading, updating and deleting products

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// CARLOS: GET /api/products - Get all products (public)
router.get('/', productController.getAllProducts);

// CARLOS: GET /api/products/:id - Get specific product (public)
router.get('/:id', productController.getProductById);

// CARLOS: POST /api/products - Create new product (Admin only, requires authentication)
router.post('/', authMiddleware, productController.createProduct);

// CARLOS: PUT /api/products/:id - Edit product (Admin only, requires authentication)
router.put('/:id', authMiddleware, productController.updateProduct);

// CARLOS: DELETE /api/products/:id - Delete product (Admin only, requires authentication)
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
