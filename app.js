const express = require(`express`);
const indexRouter = require(`./routes/index`);

const app = express();

app.set(`views`, `${__dirname}/views`);
app.set(`view engine`, `pug`);

app.use(express.static(`${__dirname}/assets`));
app.use(`/`, indexRouter);

app.listen(3000, () => {
  console.log(`Server is listening`);
});
