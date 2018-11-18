const mongoose = require(`mongoose`);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // unique: true,
    required: [true, `Email is required`],
    validate: {
      validator(v) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(v);
      },
      message: `Email is not correct`
    }
  },
  avatarUrl: String
});

const User = mongoose.model(`User`, UserSchema);

module.exports = User;
