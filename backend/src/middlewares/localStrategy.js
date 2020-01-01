const { Strategy: LocalStrategy } = require('passport-local')

module.exports = (passport, User) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password', session: false },
      (email, password, done) => {
        User.findOne({ email }, (err, user) => {
          if (err) {
            return done(err, false, { message: 'Incorrect email or password' })
          }

          if (!user || !user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect email or password' })
          }

          return done(null, user, { message: 'Logged in successfully' })
        })
      }
    )
  )
}
