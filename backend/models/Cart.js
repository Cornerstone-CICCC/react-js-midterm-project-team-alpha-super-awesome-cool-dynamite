// CARLOS: Cart Model
// Defines the structure of shopping cart
// Contains the products that a user has added to their cart

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // CARLOS: ID of the user who owns the cart
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // CARLOS: Array of products in the cart
  items: [
    {
      // CARLOS: Product ID
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      // CARLOS: Quantity of this product
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      // CARLOS: Product price at the time it was added (for reference)
      price: {
        type: Number,
        required: true
      }
    }
  ],
  // CARLOS: Last update date
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema);
