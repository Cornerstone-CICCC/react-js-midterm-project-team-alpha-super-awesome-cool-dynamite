// CARLOS: Cart Routes
// Defines endpoints for getting, adding, updating and removing products from cart

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

// CARLOS: All cart endpoints require authentication
router.use(authMiddleware);

// CARLOS: GET /api/cart - Get user's cart
router.get('/', cartController.getCart);

// CARLOS: POST /api/cart/add - Add product to cart
router.post('/add', cartController.addToCart);

// CARLOS: DELETE /api/cart/remove/:productId - Remove product from cart
router.delete('/remove/:productId', cartController.removeFromCart);

// CARLOS: PUT /api/cart/update/:productId - Update product quantity
router.put('/update/:productId', cartController.updateCartItem);

module.exports = router;
