const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();

const generateSlug = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-');

// Post Model
const Post = require('../../models/Post');

// @route GET api/posts
// @desc GET All posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(Posts => res.json(Posts));
});

// @route GET api/posts
// @desc GET specific post
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ message: "Can't find post matching that id" })
    );
});

// @route POST api/Posts
// @desc Create a Post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const { title, description, body, author, authorSlug } = req.body;

  const postDuplicate = await Post.findOne({ title });
  if (postDuplicate) {
    return res.status(400).json({
      message:
        'An post already exists with that title. Do you want to edit that post? If so, enter edit mode. Otherwise, please change the post title.',
    });
  }

  const newPost = new Post({
    title,
    description,
    body,
    author,
    authorSlug,
    postSlug: generateSlug(title),
  });

  newPost
    .save()
    .then(post => res.status(201).json(post))
    .catch(err => res.status(400).json({ message: err }));
});

// @route DELETE api/posts
// @desc Delete a post
// @access Private
router.delete('/:id', verifyToken, (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.status(204).end()))
    .catch(err =>
      res.status(404).json({ message: "Can't find post matching that id" })
    );
});

// @route Patch api/posts
// @desc Update a post
// @access Private
router.patch('/:id', verifyToken, async (req, res) => {
  const { title } = req.body;
  const postDuplicate = await Post.findOne({ title });
  if (postDuplicate) {
    return res.status(400).json({
      message:
        'An post already exists with that title. Please choose a different title.',
    });
  }
  try {
    const post = await Post.findById(req.params.id);
    post.set(req.body);
    post.save().then(() => res.json(post));
  } catch (err) {
    res.status(404).json({ message: "Can't find post matching that id" });
  }
});

module.exports = router;
