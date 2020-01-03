const authenticate = require('./authenticate')

module.exports = (req, res, next) => {
  authenticate('jwt')(req, res, next)
}
