// CARLOS: Main Express server file
// This file starts the server, configures middleware and connects routes

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// CARLOS: Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

// CARLOS: Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// CARLOS: Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// CARLOS: API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// CARLOS: Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server running correctly' });
});

// CARLOS: Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// CARLOS: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
