const passport = require('passport')
const passportLocal = require('passport-local')
const User = require('../models/mongo/user')

const LocalStrategy = passportLocal.Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err)
    }

    done(null, user)
  })
})

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Invalid email or password' })
      }

      return done(null, user)
    })
  })
)
