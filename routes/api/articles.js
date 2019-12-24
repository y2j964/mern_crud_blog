const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();

// Article Model
const Article = require('../../models/Article');

// @route GET api/articles
// @desc GET All articles
// @access Public
router.get('/', (req, res) => {
  Article.find()
    .sort({ date: -1 })
    .then(Articles => res.json(Articles));
});

// @route GET api/articles
// @desc GET specific article
// @access Public
router.get('/:id', (req, res) => {
  Article.findById(req.params.id).then(article => res.json(article));
});

// @route POST api/Articles
// @desc Create a Article
// @access Private
router.post('/', async (req, res) => {
  const { title, description, post } = req.body;

  const articleDuplicate = await Article.findOne({ title });
  if (articleDuplicate) {
    return res.status(400).json({
      msg:
        'An article already exists with that title. Do you want to edit that article? If so, enter edit mode. Otherwise, please change the article title.',
    });
  }

  const newArticle = new Article({
    title,
    description,
    post,
  });

  newArticle
    .save()
    .then(Article => res.status(201).json(Article))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// @route DELETE api/articles
// @desc Delete a article
// @access Private
router.delete('/:id', (req, res) => {
  Article.findById(req.params.id)
    .then(article => article.remove().then(() => res.status(204).send()))
    .catch(err => res.status(404).json({ success: false }));
});

// @route DELETE api/articles
// @desc Delete a article
// @access Private
router.patch('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    article.set(req.body);
    article.save().then(() => res.send({ data: article }));
  } catch (err) {
    res.status(404).json({ msg: "Can't find article matching that id" });
  }
});

module.exports = router;
