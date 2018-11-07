const app = require(`../app`);
const config = require(`../config`);

module.exports = {
  name: `--srv`,
  description: `starts server`,
  execute: () => {
    app.listen(config.PORT, () => {
      console.log(`Server is listening`);
    });
  }
};
