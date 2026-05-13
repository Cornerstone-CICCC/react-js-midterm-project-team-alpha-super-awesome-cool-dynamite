// CARLOS: User Model
// Defines the structure of users in the database
// Fields: email, password (encrypted), name, role (user/admin)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // CARLOS: Unique email for each user
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  // CARLOS: Password (will be encrypted with bcryptjs)
  password: {
    type: String,
    required: true
  },
  // CARLOS: User's full name
  name: {
    type: String,
    required: true
  },
  // CARLOS: User role (user or admin)
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // CARLOS: Creation date
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
