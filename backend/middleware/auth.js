// CARLOS: Authentication Middleware
// Verifies that the user has a valid JWT token
// Used on routes that require user authentication

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // CARLOS: Get the token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    // CARLOS: Verify that the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // CARLOS: Save user information in req.user for later use
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
