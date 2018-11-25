const othersRouters = require(`./others`);
const postRouter = require(`./post`);
const commentsRouter = require(`./comments`);
const commentRouter = require(`./comment`);
const loginRouter = require(`./login`);

const init = (app) => {
  app.use(`/`, othersRouters);
  app.use(`/api/posts`, postRouter);
  app.use(`/api/comments`, commentsRouter);
  app.use(`/api/comment`, commentRouter);
  app.use(`/api/login`, loginRouter);
};

module.exports = init;
