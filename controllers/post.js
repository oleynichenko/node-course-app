const fs = require(`fs`);
const {user, posts} = require(`../mocks-data`);

const _getMaxId = (data) => {
  return data.reduce((max, obj) => obj.id > max ? obj.id : max, data[0].id);
};

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
  const newPost = {
    author: {
      id: user._id,
      name: user.username,
      avatar: user.avatarUrl
    },
    publicationDate: Date.now(),
    text: req.body.text,
    id: _getMaxId(posts) + 1
  };

  const fileData = req.file;

  if (fileData) {
    const pictureUrl = _getPictureUrl(fileData);
    const picturePath = _getPicturePath(pictureUrl);
    const pictureContent = fileData.buffer;

    fs.writeFile(picturePath, pictureContent, {encoding: `binary`}, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        newPost.picture = pictureUrl;
        posts.push(newPost);

        res.json(newPost);
      }
    });
  } else {
    posts.push(newPost);

    res.json(newPost);
  }
};

const sendPost = (req, res) => {
  const postId = +req.params.postId;
  const post = posts.find((item) => item.id === postId);

  res.json(post);
};

const sendPosts = (req, res) => {
  res.json(posts);
};

const editPost = (req, res) => {
  const postId = +req.params.postId;
  const post = posts.find((item) => item.id === postId);
  post.text = req.body.text;

  const fileData = req.file;

  if (fileData) {
    const pictureUrl = _getPictureUrl(fileData);
    const picturePath = _getPicturePath(pictureUrl);
    const pictureContent = fileData.buffer;

    fs.writeFile(picturePath, pictureContent, {encoding: `binary`}, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        post.picture = pictureUrl;

        res.json(post);
      }
    });
  } else {
    res.json(post);
  }

};

const deletePost = (req, res) => {
  const postId = +req.params.postId;
  const postIndex = posts.findIndex((elem) => elem.id === postId);

  posts.splice(postIndex, 1);
  res.send({postId});
};

module.exports = {
  savePost,
  sendPost,
  sendPosts,
  editPost,
  deletePost
};
