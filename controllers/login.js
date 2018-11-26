const jwt = require(`jsonwebtoken`);
const User = require(`../db/user`);
const NotFoundError = require(`../errors/not-found`);
const BadRequest = require(`../errors/bad-request`);
const {jwtSecretString} = require(`../config/index`);

const signin = (req, res, next) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      next(err);
    } else {
      if (!user) {
        next(new NotFoundError(`Пользователь не найден`));
      }

      user.comparePassword(req.body.password, (error, isMatch) => {
        if (isMatch && !error) {
          const token = jwt.sign(user.toObject(), jwtSecretString, {expiresIn: 30 * 60});

          res.json({success: true, token: `JWT ${token}`});
        } else {
          next(new BadRequest(`Неверный пароль`));
        }
      });
    }
  });
};

const signup = (req, res, next) => {
  const newUser = new User(req.body);

  newUser.save((err) => {
    if (err) {
      next(err);
    } else {
      res.json({success: true, msg: `User created`});
    }
  });
};

module.exports = {
  signin,
  signup
};
