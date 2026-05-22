// CARLOS: In-memory user storage
// For this project, we simulate a database with in-memory storage

let users = [];

const userStorage = {
  findByEmail: (email) => {
    return users.find(u => u.email === email);
  },

  create: (userData) => {
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },

  findById: (id) => {
    return users.find(u => u._id === id);
  }
};

module.exports = userStorage;
