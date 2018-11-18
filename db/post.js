const mongoose = require(`mongoose`);

const PostSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  publicationDate: {
    type: Date
  },
  text: String,
  picture: String
});

const Post = mongoose.model(`Post`, PostSchema);

module.exports = Post;

