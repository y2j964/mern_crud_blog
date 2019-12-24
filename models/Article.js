const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  post: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Article = mongoose.model('article', ArticleSchema);
