const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt-nodejs`);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, `Введите ваш ник`],
    unique: true
  },
  password: String,
  firstName: {
    type: String,
    required: [true, `Введите ваше имя`],
  },
  lastName: {
    type: String,
    required: [true, `Введите вашу фамилию`],
  },
  email: {
    type: String,
    unique: true,
    required: [true, `Введите email`],
    validate: {
      validator(v) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(v);
      },
      message: `Проверьте email`
    }
  },
  avatar: String
});

userSchema.statics.getUserByEmail = function (email, cb) {
  this.findOne({email}, cb);
};

userSchema.pre(`save`, function (next) {
  const user = this;

  if (user.isModified(`password`) || user.isNew) {
    bcrypt.hash(user.password, null, null, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      return next();
    });
  } else {
    next();
  }
});

const User = mongoose.model(`User`, userSchema);

module.exports = User;
