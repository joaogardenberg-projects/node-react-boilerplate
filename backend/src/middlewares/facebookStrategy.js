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
        callbackURL: FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'email', 'photos']
      },
      (_, __, { id: facebookId, displayName: name, emails, photos }, done) => {
        const { value: picture } =
          photos && photos.length
            ? photos.find(({ value }) => value)
            : { value: undefined }

        const { value: oauthEmail } =
          emails && emails.length
            ? emails.find(({ value }) => value)
            : { value: undefined }

        User.findOne(
          { facebookId, signInProvider: 'facebook' },
          (err, user) => {
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
                  facebookId,
                  oauthEmail,
                  signInProvider: 'facebook'
                },
                (_err, _user) => {
                  _err
                    ? done(_err, _user, { message: 'Something went wrong' })
                    : done(null, _user, { message: 'Signed in successfully' })
                }
              )
            }
          }
        )
      }
    )
  )
}
