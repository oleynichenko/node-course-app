const PostModel = require(`../db/post`);

const savePost = (req, res, next) => {
  const userId = req.user._id;

  const post = new PostModel({
    author: userId,
    text: req.body.text,
  });

  if (req.pictureUrl) {
    post.set({picture: req.pictureUrl});
  }

  post.save((error, savedPost) => {
    if (error) {
      next(error);
    } else {
      res.json(savedPost);
    }
  });
};

const getPost = (req, res) => {
  const postId = +req.params.postId;

  PostModel.getPost(postId, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.json(post);
    }
  });
};

const getPosts = (req, res) => {
  const userId = req.user._id;

  PostModel.getPosts((err, data) => {
    data.forEach((post) => {
      if (post.author._id.equals(userId)) {
        post.editable = true;
      }
    });

    res.json(data);
  });
};

const editPost = (req, res, next) => {
  const postId = +req.params.postId;

  PostModel.findOne({id: postId}, (err, post) => {
    if (err) {
      next(err);
    } else {
      const text = req.body.text;

      if (text) {
        post.text = text;
      }

      if (req.pictureUrl) {
        post.picture = req.pictureUrl;
      }

      post.save((error, savedPost) => {
        if (error) {
          next(error);
        } else {
          res.status(201).json(savedPost);
        }
      });
    }
  });
};

const deletePost = (req, res, next) => {
  const postId = +req.params.postId;

  PostModel.removePost(postId, (err) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(204);
    }
  });
};

module.exports = {
  savePost,
  getPost,
  getPosts,
  editPost,
  deletePost
};

