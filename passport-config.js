const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
  const authenticateUser = () => {};
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
}

module.exports = initialize;
