const mongoose = require(`mongoose`);

const commentSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `User`
  },
  publicationDate: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  }
});

commentSchema.statics.getComments = function (postId, cb) {
  this.find({postId})
    .populate(`user`)
    .sort(`publicationDate`)
    .exec(cb);
};

commentSchema.statics.getComment = function (id, cb) {
  this
    .findOne({_id: id})
    .populate(`user`)
    .exec(cb);
};

commentSchema.statics.removeComment = function (id, cb) {
  this.deleteOne({_id: id}, cb);
};

const CommentModel = mongoose.model(`Comment`, commentSchema);

module.exports = CommentModel;
