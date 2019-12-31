const bodyParser = require('body-parser')
// const cookieSession = require('cookie-session')
const passport = require('passport')
// const { COOKIE_KEY } = require('../config')
require('../services/passport')

module.exports = (app) => {
  app.use(bodyParser.json())
  // app.use(
  //   cookieSession({
  //     // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  //     // maxAge: 24 * 60 * 60 * 1000, // 1 day
  //     maxAge: 60 * 60 * 1000, // 1 hour
  //     // maxAge: 10 * 60 * 1000, // 10 minutes
  //     keys: [COOKIE_KEY]
  //   })
  // )
  app.use(passport.initialize())
  app.use(passport.session())
}
