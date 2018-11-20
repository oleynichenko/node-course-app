const {connectDb} = require(`../db/mongoose`);
const users = require(`../mocks/users`);
const posts = require(`../mocks/posts`);
const PostModel = require(`../db/post`);
const UserModel = require(`../db/user`);

module.exports = {
  name: `--fill`,
  description: `fills base with test data`,
  execute: () => {
    const connection = connectDb();

    const saveUserPosts = (savedUser) => {
      posts.forEach((post) => {
        if (post.author === savedUser.firstName) {
          post.author = savedUser._id;

          PostModel.create(post, (err) => {
            if (err) {
              console.log(err);
              process.exit(1);
            }
          });
        }
      });
    };

    connection
      .on(`error`, () => {
        console.log(`Error in connection with db`);
      })
      .on(`connected`, () => {
        console.log(`DB is connected`);

        users.forEach((user) => {
          UserModel.create(user, (err, savedUser) => {
            if (err) {
              console.log(err);
              process.exit(1);
            } else {
              saveUserPosts(savedUser);
            }
          });
        });
        // connection.close();
      });
  }
};
