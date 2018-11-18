const othersRouters = require(`./others`);
const postRouter = require(`./post`);

const init = (app) => {
  app.use(`/`, othersRouters);
  app.use(`/api/posts`, postRouter);
};

module.exports = init;
