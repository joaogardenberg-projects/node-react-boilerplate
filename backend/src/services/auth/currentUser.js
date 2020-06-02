const authenticate = require('middlewares/authenticate')
const sanitize = require('services/users/sanitize')

module.exports = (req, res) => {
  return new Promise((resolve) => {
    authenticate('jwt')(req, res, () => {
      resolve(sanitize(req.user))
    })
  })
}
