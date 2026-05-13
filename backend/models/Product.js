// CARLOS: Product Model
// Defines the structure of products in the database
// Fields: name, description, price, image, category, stock

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // CARLOS: Product name
  name: {
    type: String,
    required: true
  },
  // CARLOS: Product description
  description: {
    type: String,
    required: true
  },
  // CARLOS: Product price
  price: {
    type: Number,
    required: true
  },
  // CARLOS: Product image URL
  image: {
    type: String,
    required: true
  },
  // CARLOS: Product category (e.g., 'electronics', 'clothing', etc.)
  category: {
    type: String,
    required: true
  },
  // CARLOS: Available stock of the product
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  // CARLOS: ID of the admin who created the product
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // CARLOS: Creation date
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
