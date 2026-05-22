// CARLOS: Product Controller
// Handles CRUD operations for products in MongoDB

const Product = require('../models/Product');

// CARLOS: GET - Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// CARLOS: GET - Get specific product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// CARLOS: POST - Create new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to create products' });
    }

    const { name, description, price, image, category, stock } = req.body;

    if (!name || !description || !price || !image || !category || stock === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
      createdBy: req.user.id
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// CARLOS: PUT - Edit product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to edit products' });
    }

    const { name, description, price, image, category, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, category, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// CARLOS: DELETE - Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to delete products' });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
