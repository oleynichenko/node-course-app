const User = require(`../db/user`);

const signin = (req, res) => {

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
