const CommentModel = require(`../db/comment`);

const getComment = (req, res) => {
  const commentId = req.params.commentId;

  CommentModel.getComment(commentId, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
};

const deleteComment = (req, res) => {
  const id = req.params.commentId;

  CommentModel.removeComment(id, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
};

const editComment = (req, res) => {
  const _id = req.params.commentId;
  const text = req.body.text;

  CommentModel.findById(_id, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      comment.text = text;

      comment.save((error, savedComment) => {
        if (error) {
          console.log(error);
        } else {
          res.json(savedComment);
        }
      });
    }
  });

};

module.exports = {
  deleteComment,
  editComment,
  getComment
};
