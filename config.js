const PORT = +process.env.PORT || 3000;
const HOST = process.env.HOST || `localhost:3000`;
const DB_HOST = process.env.DB_HOST || `mongodb+srv://user:123@cluster0-6pqxu.mongodb.net/test?retryWrites=true`;
const DB_NAME = process.env.DB_NAME || `app`;

module.exports = {
  HOST,
  PORT,
  DB_HOST,
  DB_NAME
};
