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
          authorSlug: user.authorSlug,
          email: user.email,
        },
      });
    }
  );
});

// @route Get api/auth
// @desc Get individual user data via jwt
// @access Private
router.get('/', verifyToken, (req, res) => {
  User.findById(req.user.id, '-password')
    .then(user => res.json(user))
    .catch(() =>
      res.status(404).json({ msg: "Can't find user matching that id" })
    );
});

module.exports = router;
