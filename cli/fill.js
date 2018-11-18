const {connectDb} = require(`../db/mongoose`);
const mocks = require(`../mocks-data`);
// const PostModel = require(`../db/post`);
const UserModel = require(`../db/user`);

module.exports = {
  name: `--fill`,
  description: `fills base with test data`,
  execute: () => {
    const connection = connectDb();

    connection
      .on(`error`, () => {
        console.log(`Error in connection with db`);
      })
      .on(`connected`, () => {
        console.log(`DB is connected`);

        UserModel.create(mocks.user, (err) => {
          if (err) {
            console.log(err);
            process.exit(1);
          } else {
            console.log(`User is added`);
            connection.close(function () {
              console.log(`Mongoose connection disconnected`);
            });
          }
        });

        // console.log(`Database ${DB_NAME} is filled with test data`);

      });


  }
};
