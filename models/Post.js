const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorSlug: {
    type: String,
    required: true,
  },
  postSlug: {
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

module.exports = Post = mongoose.model('post', PostSchema);
