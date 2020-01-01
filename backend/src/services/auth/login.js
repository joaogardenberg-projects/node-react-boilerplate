const jwt = require('jsonwebtoken')
const authenticate = require('../../middlewares/authenticate')
const { JWT_SECRET } = require('../../config')
const sanitize = require('../users/sanitize')

module.exports = (req, res, strategy, options) => {
  return new Promise((resolve) => {
    authenticate(strategy, options)(req, res, () => {
      if (req.user) {
        resolve({
          user: sanitize(req.user),
          token: jwt.sign(req.user.toJSON(), JWT_SECRET)
        })
      } else {
        resolve(null)
      }
    })
  })
}
