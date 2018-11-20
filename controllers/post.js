const fs = require(`fs`);
const PostModel = require(`../db/post`);

const _getFileExtension = (mimetype) => {
  return mimetype.split(`/`)[1];
};

const _getPictureUrl = (fileData) => {
  const uniqueValue = Date.now();
  const fileExt = _getFileExtension(fileData.mimetype);
  const filename = `${uniqueValue}.${fileExt}`;

  return `uploads/${filename}`;
};

const _getPicturePath = (url) => {
  return `${process.cwd()}/assets/${url}`;
};

const savePost = (req, res) => {
  const post = new PostModel({
    author: res.locals.user._id,
    text: req.body.text,
  });

  const fileData = req.file;
  if (fileData) {
    const pictureUrl = _getPictureUrl(fileData);
    const picturePath = _getPicturePath(pictureUrl);
    const pictureContent = fileData.buffer;

    fs.writeFile(picturePath, pictureContent, {encoding: `binary`}, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        post.set({picture: pictureUrl});
        post.save((error, savedPost) => {
          if (error) {
            console.log(error);
          } else {
            res.json(savedPost);
          }
        });
      }
    });
  } else {

    post.save((error, savedPost) => {
      if (error) {
        console.log(error);
      } else {
        res.json(savedPost);
      }
    });
  }
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
  PostModel.getPosts((err, data) => {
    res.json(data);
  });
};

const editPost = (req, res) => {
  const postId = +req.params.postId;

  PostModel.findOne({id: postId}, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      const text = req.body.text;

      if (text) {
        post.text = text;
      }

      const fileData = req.file;

      if (fileData) {
        const pictureUrl = _getPictureUrl(fileData);
        const picturePath = _getPicturePath(pictureUrl);
        const pictureContent = fileData.buffer;

        fs.writeFile(picturePath, pictureContent, {encoding: `binary`}, (error) => {
          if (error) {
            console.log(error.message);
          }
        });

        post.picture = pictureUrl;
      }

      post.save((error, savedPost) => {
        if (error) {
          console.log(error);
        } else {
          res.json(savedPost);
        }
      });
    }
  });
};

const deletePost = (req, res) => {
  const postId = +req.params.postId;

  PostModel.removePost(postId, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({postId});
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
