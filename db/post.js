const mongoose = require(`mongoose`);
const autoIncrement = require(`mongoose-auto-increment`);

autoIncrement.initialize(mongoose.connection);

const postSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `User`
  },
  publicationDate: {
    type: Date,
    default: Date.now
  },
  text: String,
  picture: String
});

postSchema.plugin(autoIncrement.plugin, {model: `Post`, field: `id`});

postSchema.statics.getPosts = function (cb) {
  this
    .find()
    .populate(`author`, [`firstName`, `lastName`, `avatar`])
    .sort({publicationDate: -1})
    .exec(cb);
};

postSchema.statics.removePost = function (id, cb) {
  this.deleteOne({id}, cb);
};

postSchema.statics.getPost = function (id, cb) {
  this
    .findOne({id}, `text picture author id`)
    .populate(`author`, [`firstName`, `lastName`, `avatar`])
    .exec(cb);
};

const PostModel = mongoose.model(`Post`, postSchema);

module.exports = PostModel;
