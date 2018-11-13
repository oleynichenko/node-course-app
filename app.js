const express = require(`express`);
const initRouters = require(`./routes/index`);
const config = require(`./config`);

const app = express();

app.set(`views`, `${__dirname}/views`);
app.set(`view engine`, `pug`);

app.use(express.static(`${__dirname}/assets`));
initRouters(app);

const runServer = () => {
  app.listen(config.PORT, () => {
    console.log(`Server is listening`);
  });
};

module.exports = {
  runServer
};
