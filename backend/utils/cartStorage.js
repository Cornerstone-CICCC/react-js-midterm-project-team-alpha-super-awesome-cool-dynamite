// CARLOS: In-memory cart storage
// Simulates a database with in-memory storage for shopping carts

let carts = [];

const cartStorage = {
  findByUserId: (userId) => {
    return carts.find(c => c.user === userId);
  },

  create: (userId) => {
    const newCart = {
      _id: Date.now().toString(),
      user: userId,
      items: [],
      createdAt: new Date()
    };
    carts.push(newCart);
    return newCart;
  },

  findOrCreate: (userId) => {
    let cart = cartStorage.findByUserId(userId);
    if (!cart) {
      cart = cartStorage.create(userId);
    }
    return cart;
  },

  save: (cart) => {
    const index = carts.findIndex(c => c._id === cart._id);
    if (index !== -1) {
      carts[index] = cart;
    }
    return cart;
  }
};

module.exports = cartStorage;
