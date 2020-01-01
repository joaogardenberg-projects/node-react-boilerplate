const { Strategy: InstagramStrategy } = require('passport-instagram')
const {
  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET,
  INSTAGRAM_CALLBACK_URL
} = require('../config')

module.exports = (passport, User) => {
  passport.use(
    new InstagramStrategy(
      {
        clientID: INSTAGRAM_CLIENT_ID,
        clientSecret: INSTAGRAM_CLIENT_SECRET,
        callbackURL: INSTAGRAM_CALLBACK_URL
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(request, accessToken, refreshToken, profile, done)
        done(null, false)
      }
    )
  )
}
