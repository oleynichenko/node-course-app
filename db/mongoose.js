const mongoose = require(`mongoose`);
const {DB_HOST, DB_NAME} = require(`../config/index`);

const connectDb = () => {
  const dbURI = `${DB_HOST}/${DB_NAME}`;
  mongoose.connect(dbURI, {useNewUrlParser: true});

  return mongoose.connection;
};

module.exports = {
  connectDb
};
