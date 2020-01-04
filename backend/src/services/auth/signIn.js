const jwt = require('jsonwebtoken')
const authenticate = require('../../middlewares/authenticate')
const { JWT_SECRET } = require('../../config')
const sanitize = require('../users/sanitize')
const jwtRedis = require('./jwtRedis')

module.exports = (req, res, strategy, options) => {
  return new Promise((resolve) => {
    authenticate(strategy, options)(req, res, () => {
      if (req.user) {
        const token = jwt.sign(req.user.toJSON(), JWT_SECRET)

        jwtRedis.add(jwt.decode(token)).then((success) => {
          if (success) {
            resolve({
              token,
              user: sanitize(req.user)
            })
          } else {
            resolve(null)
          }
        })
      } else {
        resolve(null)
      }
    })
  })
}
