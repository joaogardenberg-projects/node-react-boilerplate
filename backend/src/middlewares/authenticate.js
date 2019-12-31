const passport = require('passport')

module.exports = (strategy) =>
  passport.authenticate(strategy, { session: false })
