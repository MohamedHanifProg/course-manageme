const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Ensure this line is present
const User = require('../models/user');
const crypto = require('crypto');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

    // Generate a short random token
    const token = crypto.randomBytes(5).toString('hex'); // 10-character token

    // Store the token in a session or database with associated user data
    // Example: Redis, in-memory cache, or a database entry

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
