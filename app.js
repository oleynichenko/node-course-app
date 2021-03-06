const express = require(`express`);
const initRouters = require(`./routes/index`);
const config = require(`./config/index`);
const UserModel = require(`./db/user`);
const handleErrors = require(`./errors/handle-errors`);
const currentUserEmail = `alex@gmail.com`;

const passport = require(`passport`);
require(`./config/passport`)(passport);

const app = express();
app.use(passport.initialize());

// инициализируем временного пользователя
UserModel.getUserByEmail(currentUserEmail, (err, user) => {
  if (err) {
    console.log(err);
  } else {
    app.locals.user = user;
  }
});

app.use((req, res, next) => {
  res.locals.user = app.locals.user;
  next();
});

app.set(`views`, `${__dirname}/views`);
app.set(`view engine`, `pug`);

app.use(express.static(`${__dirname}/assets`));
initRouters(app);

app.use(handleErrors);

const runServer = () => {
  app.listen(config.PORT, () => {
    console.log(`Server is listening`);
  });
};

module.exports = {
  runServer
};
