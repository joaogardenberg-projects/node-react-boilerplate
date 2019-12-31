const passport = require('passport')
const User = require('../models/mongo/user')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: GoogleStrategy } = require('passport-google-oauth2')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { Strategy: InstagramStrategy } = require('passport-instagram')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET,
  INSTAGRAM_CALLBACK_URL,
  JWT_SECRET
} = require('../config')

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

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_CALLBACK_URL,
//       passReqToCallback: true
//     },
//     (request, accessToken, refreshToken, profile, done) => {
//       console.log(request, accessToken, refreshToken, profile, done)
//       done(null, false)
//     }
//   )
// )

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_CLIENT_ID,
//       clientSecret: FACEBOOK_CLIENT_SECRET,
//       callbackURL: FACEBOOK_CALLBACK_URL,
//       passReqToCallback: true
//     },
//     (request, accessToken, refreshToken, profile, done) => {
//       console.log(request, accessToken, refreshToken, profile, done)
//       done(null, false)
//     }
//   )
// )

// passport.use(
//   new InstagramStrategy(
//     {
//       clientID: INSTAGRAM_CLIENT_ID,
//       clientSecret: INSTAGRAM_CLIENT_SECRET,
//       callbackURL: INSTAGRAM_CALLBACK_URL,
//       passReqToCallback: true
//     },
//     (request, accessToken, refreshToken, profile, done) => {
//       console.log(request, accessToken, refreshToken, profile, done)
//       done(null, false)
//     }
//   )
// )

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    (jwtPayload, done) => {
      User.findOne({ id: jwtPayload.sub }, (err, user) => {
        if (err) {
          return done(err, false)
        }

        if (!user) {
          return done(null, false)
        }

        return done(null, user)
      })
    }
  )
)
