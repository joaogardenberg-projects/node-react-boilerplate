const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { JWT_SECRET } = require('config')
const jwtRedis = require('services/auth/jwtRedis')

module.exports = (passport, User) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
      },
      (jwtPayload, done) => {
        jwtRedis.check(jwtPayload).then((validToken) => {
          if (!validToken) {
            return done(null, false, { message: 'Unauthorized' })
          }

          User.findById(jwtPayload._id, (err, user) => {
            if (err) {
              return done(err, false, { message: 'Unauthorized' })
            }

            if (!user) {
              return done(null, false, { message: 'Unauthorized' })
            }

            done(null, user, { message: 'Authenticated successfully' })
          })
        })
      }
    )
  )
}
