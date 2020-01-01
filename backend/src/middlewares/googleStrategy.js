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
        const { value: picture } =
          photos && photos.length
            ? photos.find(({ value }) => value)
            : { value: undefined }

        const { value: oauthEmail } =
          emails && emails.length
            ? emails.find(({ value, verified }) => verified && value)
            : { value: undefined }

        User.findOne({ googleId, loginProvider: 'google' }, (err, user) => {
          if (err) {
            return done(err, user, { message: 'Something went wrong' })
          }

          if (user) {
            if (
              (name && user.name !== name) ||
              (picture && (user.picture || {}).url !== picture) ||
              (oauthEmail && user.oauthEmail !== oauthEmail)
            ) {
              const newName = name || user.name
              const newPicture =
                picture && (user.picture || {}).url !== picture
                  ? { url: picture, alt: `${name || 'User'}'s picture` }
                  : user.picture
              const newOauthEmail = oauthEmail || user.oauthEmail

              user
                .set({
                  name: newName,
                  picture: newPicture,
                  oauthEmail: newOauthEmail
                })
                .save((_err, _user) => {
                  _err
                    ? done(_err, _user, { message: 'Something went wrong' })
                    : done(null, _user, { message: 'Signed in successfully' })
                })
            } else {
              done(null, user, { message: 'Signed in successfully' })
            }
          } else {
            User.create(
              {
                name,
                picture: picture
                  ? { url: picture, alt: `${name || 'User'}'s picture` }
                  : undefined,
                googleId,
                oauthEmail,
                loginProvider: 'google'
              },
              (_err, _user) => {
                _err
                  ? done(_err, _user, { message: 'Something went wrong' })
                  : done(null, _user, { message: 'Signed up successfully' })
              }
            )
          }
        })
      }
    )
  )
}
