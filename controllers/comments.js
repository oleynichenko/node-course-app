const CommentModel = require(`../db/comment`);

const getComments = (req, res) => {
  const postId = Number(req.params.postId);
  CommentModel.getComments(postId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
};

const saveComment = (req, res) => {
  CommentModel.create({
    postId: Number(req.params.postId),
    text: req.body.text,
    user: res.locals.user._id
  }, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
};

module.exports = {
  getComments,
  saveComment
};
