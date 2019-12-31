const authenticate = require('./authenticate')

module.exports = (req, res, next) => {
  authenticate('jwt')(req, res, () => {
    if (!req.user || !req.user.admin) {
      return res.status(401).send('Unauthorized')
    }

    next()
  })
}
