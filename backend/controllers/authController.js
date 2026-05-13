// CARLOS: Authentication Controller
// Handles signup, login and logout logic
// Responsible for validating data, encrypting passwords and generating JWT tokens

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CARLOS: Signup - Create new account
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // CARLOS: Validate that required fields are present
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // CARLOS: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // CARLOS: Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // CARLOS: Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role: 'user'
    });

    await newUser.save();

    // CARLOS: Create and send JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// CARLOS: Login - Sign in
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // CARLOS: Validate that required fields are present
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // CARLOS: Search for user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // CARLOS: Compare entered password with encrypted one
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // CARLOS: Create and send JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Session started successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};

// CARLOS: Logout - Sign out
// In this case, logout is handled on the frontend by removing the token
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Session closed successfully' });
};
