const passportJwt = require('passport-jwt');
const { User } = require('../models');
const defaultMessages = require('../defaultMessage');

const JwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

// customizing the incoming request to the JWT strategy
const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken('authorization'),
  secretOrKey: process.env.SECRET_KEY,
  passReqToCallback: true
};

function verifyPassportToken(passport) {
  // after successful verification of token data is passed to payload
  passport.use(new JwtStrategy(options, (req, payload, done) => {
    User.findOne({
      where: {
        id: payload.user_id,
        email: payload.email
      }
    }).then(async (data) => {
      if (data) {
        return done(null, payload);
      }

      return done(null, false);
    }).catch((error) => (done({ errorType: defaultMessages.internalServerError, Message: `${defaultMessages.internalServerError}, ${error}` }, false)));
  }));
}

module.exports = verifyPassportToken;
