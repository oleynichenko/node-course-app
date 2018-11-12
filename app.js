const express = require(`express`);
const initRouters = require(`./routes/index`);
const mongoose = require(`./db/mongoose`);

const app = express();

app.set(`views`, `${__dirname}/views`);
app.set(`view engine`, `pug`);

app.use(express.static(`${__dirname}/assets`));
initRouters(app);

module.exports = app;
