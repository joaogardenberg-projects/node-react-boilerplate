const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
} = require('../config')

module.exports = (passport, User) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
      },
      (_, __, { id: googleId, displayName: name, emails, photos }, done) => {
        const { value: picture } = photos.find(({ value }) => value)
        const { value: email } = emails.find(
          ({ value, verified }) => verified && value
        )

        User.findOne({ email }, (err, user) => {
          if (err) {
            return done(err, user, { message: 'Something went wrong' })
          }

          if (user) {
            if (
              !user.loginProviders.includes('google') ||
              user.googleId !== googleId ||
              user.name !== name ||
              (user.picture || {}).url !== picture
            ) {
              user
                .set({
                  name,
                  picture: { url: picture, alt: 'User image' },
                  googleId,
                  loginProviders: [
                    ...new Set([...user.loginProviders, 'google'])
                  ]
                })
                .save((_err, _user) => {
                  if (_err) {
                    return done(_err, _user, {
                      message: 'Something went wrong'
                    })
                  }

                  done(null, _user, {
                    message: 'Logged in successfully'
                  })
                })
            } else {
              done(null, user, { message: 'Logged in successfully' })
            }
          } else {
            User.create(
              {
                name,
                picture: { url: picture, alt: 'User image' },
                email,
                googleId,
                loginProviders: ['google']
              },
              (_err, _user) => {
                if (_err) {
                  return done(_err, _user, {
                    message: 'Something went wrong'
                  })
                }

                done(null, _user, { message: 'Logged in successfully' })
              }
            )
          }
        })
      }
    )
  )
}
