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
  Post.findById(req.params.id).then(post => res.json(post));
});

// @route POST api/Posts
// @desc Create a Post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const { title, description, body, author } = req.body;

  const postDuplicate = await Post.findOne({ title });
  if (postDuplicate) {
    return res.status(400).json({
      msg:
        'An post already exists with that title. Do you want to edit that post? If so, enter edit mode. Otherwise, please change the post title.',
    });
  }

  const newPost = new Post({
    title,
    description,
    body,
    author,
    postSlug: generateSlug(title),
    authorSlug: generateSlug(author),
  });

  newPost
    .save()
    .then(Post => res.status(201).json(Post))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// @route DELETE api/posts
// @desc Delete a post
// @access Private
router.delete('/:id', verifyToken, (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.status(204).send()))
    .catch(err => res.status(404).json({ success: false }));
});

// @route DELETE api/posts
// @desc Delete a post
// @access Private
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.set(req.body);
    post.save().then(() => res.send({ data: post }));
  } catch (err) {
    res.status(404).json({ msg: "Can't find post matching that id" });
  }
});

module.exports = router;
