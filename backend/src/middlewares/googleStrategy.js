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
            const hasNewName = name && name !== user.name
            const hasNewPicture = picture && picture !== user.picture
            const hasNewOAuthEmail =
              oAuthEmail && oAuthEmail !== user.oAuthEmail

            if (hasNewName || hasNewPicture || hasNewOAuthEmail) {
              user
                .set({
                  name: name || user.name,
                  picture: hasNewPicture ? picture : user.picture,
                  oAuthEmail: oAuthEmail || user.oAuthEmail
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
                picture,
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
