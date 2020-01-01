const { Strategy: FacebookStrategy } = require('passport-facebook')
const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL
} = require('../config')

module.exports = (passport, User) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: FACEBOOK_CALLBACK_URL
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(request, accessToken, refreshToken, profile, done)
        done(null, false)
      }
    )
  )
}
