const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming you have a User model
const SECRET_KEY = process.env.JWT_SECRET;

// Register Controller
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate the role
    if (!['student', 'staff'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be "student" or "staff".' });
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: '10m' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Middleware to Authenticate User
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach the decoded user object to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// Middleware to Authorize User Roles
exports.authorize = (requiredRole) => {
  return (req, res, next) => {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. No user information available.' });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ error: `Access denied. Only ${requiredRole}s can perform this action.` });
    }

    next(); // User is authorized
  };
};
