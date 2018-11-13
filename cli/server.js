const {runServer} = require(`../app`);
const {connectDb} = require(`../db/mongoose`);

module.exports = {
  name: `--srv`,
  description: `starts server`,
  execute: () => {
    connectDb()
      .on(`error`, () => {
        console.log(`Error in connection with db`);
      })
      .on(`connected`, () => {
        console.log(`DB is connected`);
        runServer();
      });
  }
};
