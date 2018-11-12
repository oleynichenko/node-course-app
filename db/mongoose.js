const mongoose = require(`mongoose`);
const {DB_HOST, DB_NAME} = require(`../config`);

const dbURI = `${DB_HOST}/${DB_NAME}`;
mongoose.connect(dbURI, {useNewUrlParser: true});

const db = mongoose.connection;

db.on(`error`, () => {
  console.log(`Error in connection with db`);
});

db.once(`open`, () => {
  console.log(`DB is connected`);
});

module.exports = mongoose;
