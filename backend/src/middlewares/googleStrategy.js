const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
} = require('config')

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

        const { value: oAuthEmail } =
          emails && emails.length
            ? emails.find(({ value, verified }) => verified && value)
            : { value: undefined }

        User.findOne({ googleId, signInProvider: 'google' }, (err, user) => {
          if (err) {
            return done(err, user, { message: 'Something went wrong' })
          }

          if (user) {
            if (
              (name && user.name !== name) ||
              (picture && (user.picture || {}).url !== picture) ||
              (oAuthEmail && user.oAuthEmail !== oAuthEmail)
            ) {
              const newName = name || user.name
              const newPicture =
                picture && (user.picture || {}).url !== picture
                  ? { url: picture, alt: `${name || 'User'}'s picture` }
                  : user.picture
              const newOAuthEmail = oAuthEmail || user.oAuthEmail

              user
                .set({
                  name: newName,
                  picture: newPicture,
                  oAuthEmail: newOAuthEmail
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
                oAuthEmail,
                signInProvider: 'google'
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
