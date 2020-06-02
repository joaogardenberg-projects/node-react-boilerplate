const passport = require('passport')
const User = require('models/mongo/user')
const localStrategy = require('./localStrategy')
const jwtStrategy = require('./jwtStrategy')
const googleStrategy = require('./googleStrategy')
const facebookStrategy = require('./facebookStrategy')

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

localStrategy(passport, User)
jwtStrategy(passport, User)
googleStrategy(passport, User)
facebookStrategy(passport, User)
