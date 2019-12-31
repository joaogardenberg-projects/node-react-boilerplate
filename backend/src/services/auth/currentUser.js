const authenticate = require('../../middlewares/authenticate')
const sanitize = require('../users/sanitize')

module.exports = (req, res) => {
  return new Promise((resolve) => {
    authenticate('jwt')(req, res, () => {
      resolve(sanitize(req.user))
    })
  })
}
