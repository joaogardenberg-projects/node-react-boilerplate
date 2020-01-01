const passport = require('passport')

module.exports = (strategy, options = {}) =>
  passport.authenticate(strategy, { session: false, ...options })
