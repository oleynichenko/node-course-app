const othersRouters = require(`./others`);
const postRouter = require(`./post`);
const commentsRouter = require(`./comments`);
const commentRouter = require(`./comment`);

const init = (app) => {
  app.use(`/`, othersRouters);
  app.use(`/api/posts`, postRouter);
  app.use(`/api/comments`, commentsRouter);
  app.use(`/api/comment`, commentRouter);
};

module.exports = init;
