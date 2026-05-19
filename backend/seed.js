// CARLOS: Seed script - Load RAWG games into MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./models/Product');

const RAWG_API_URL = process.env.RAWG_API_URL;
const RAWG_API_KEY = process.env.RAWG_API_KEY;

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log('⚠️  Database already has products. Skipping seed.');
      process.exit(0);
    }

    console.log('📥 Fetching games from RAWG API...');
    const response = await axios.get(`${RAWG_API_URL}/games`, {
      params: {
        key: RAWG_API_KEY,
        page_size: 20,
        ordering: '-rating'
      }
    });

    const games = response.data.results;
    const products = games.map(game => ({
      name: game.name,
      description: game.description || `Genre: ${game.genres?.[0]?.name || 'Unknown'} | Rating: ${game.rating}/5`,
      price: Math.floor(Math.random() * 40) + 19.99,
      image: game.background_image || 'https://via.placeholder.com/300',
      category: game.genres?.[0]?.name || 'Games',
      stock: Math.floor(Math.random() * 30) + 10
    }));

    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} games into database`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
