const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
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
  avatar: String
});

userSchema.statics.getUserByEmail = function (email, cb) {
  this.findOne({email}, cb);
};

const User = mongoose.model(`User`, userSchema);

module.exports = User;
