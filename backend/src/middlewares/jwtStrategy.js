const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { JWT_SECRET } = require('../config')

module.exports = (passport, User) => {
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
}
