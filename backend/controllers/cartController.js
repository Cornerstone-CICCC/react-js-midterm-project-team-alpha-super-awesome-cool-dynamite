// CARLOS: Cart Controller
// Handles logic for adding, getting, updating and removing products from cart

const Cart = require('../models/Cart');
const Product = require('../models/Product');

// CARLOS: GET - Get user's cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    // CARLOS: If cart doesn't exist, create an empty one
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// CARLOS: POST - Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // CARLOS: Validate that required fields are present
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'ProductId and quantity required' });
    }

    // CARLOS: Verify that product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // CARLOS: Get or create user's cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // CARLOS: Check if product is already in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      // CARLOS: If it exists, update quantity
      existingItem.quantity += quantity;
    } else {
      // CARLOS: If not, add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

// CARLOS: DELETE - Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // CARLOS: Filter out the product from cart
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product', error: error.message });
  }
};

// CARLOS: PUT - Update product quantity in cart
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    // CARLOS: Validate that quantity is valid
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // CARLOS: Find the item in cart
    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // CARLOS: Update the quantity
    item.quantity = quantity;

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};
