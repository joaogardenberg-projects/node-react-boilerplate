const jwt = require('jsonwebtoken')
const authenticate = require('../../middlewares/authenticate')
const { JWT_SECRET } = require('../../config')
const sanitize = require('../users/sanitize')

module.exports = (req, res, strategy) => {
  return new Promise((resolve) => {
    authenticate(strategy)(req, res, () => {
      resolve({
        user: sanitize(req.user),
        token: jwt.sign(req.user.toJSON(), JWT_SECRET)
      })
    })
  })
}
