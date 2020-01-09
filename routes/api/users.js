const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();
require('dotenv').config();

// encrypts password(hash) with additional layer of complexity added(salt)
const getEncryptedPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (err) {
    throw err;
  }
};

// User Model
const User = require('../../models/User');

// @route Post api/users
// @desc Register/add new Users
// @access Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'Email address is already registered' });
  }
  const newUser = new User({
    name,
    email,
    password,
  });

  newUser.password = await getEncryptedPassword(newUser.password);
  const savedUser = await newUser.save();

  jwt.sign(
    { id: savedUser.id },
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) {
        throw err;
      }
      res.status(201).json({
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
        },
      });
    }
  );
});

// @route Get api/user
// @desc Get users data
// @access Private
router.get('/', verifyToken, (req, res) => {
  User.find()
    .select('-password')
    .then(user => res.json(user));
});

// @route Delete api/user
// @desc Delete user
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.remove().then(() => res.status(204).end());
  } catch (err) {
    res.status(404).json({ msg: "Can't find user matching that id" });
  }
});

// @route patch api/user
// @desc Modify user data
// @access Private
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    user.set(req.body);
    user.save().then(() => res.json({ data: user }));
  } catch (err) {
    res.status(404).json({ msg: "Can't find user matching that id" });
  }
});

module.exports = router;
