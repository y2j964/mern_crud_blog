const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();
require('dotenv').config();

// User Model
const User = require('../../models/User');

// @route Post api/auth
// @desc Login user
// @access Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  // simple  form validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: 'User does not exist' });
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }
  jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) {
        throw err;
      }
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }
  );
});

module.exports = router;
