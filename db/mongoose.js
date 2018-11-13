const mongoose = require(`mongoose`);
const {DB_HOST, DB_NAME} = require(`../config`);

const connectDb = () => {
  const dbURI = `${DB_HOST}/${DB_NAME}`;
  mongoose.connect(dbURI, {useNewUrlParser: true});

  return mongoose.connection;
};

module.exports = {
  connectDb
};
