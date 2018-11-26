const JwtStrategy = require(`passport-jwt`).Strategy;
const ExtractJwt = require(`passport-jwt`).ExtractJwt;
const {jwtSecretString} = require(`./index`);
const User = require(`../db/user`);

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(`JWT`),
    secretOrKey: jwtSecretString
  };

  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    User.findOne({_id: jwtPayload._id}, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    });
  }));
};
