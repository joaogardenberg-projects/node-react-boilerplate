const notFoundRoute = require('./notFound')
const authRoutes = require('./auth')
const usersRoutes = require('./users')
const userRoutes = require('./user')

module.exports = (app) => {
  authRoutes(app)
  usersRoutes(app)
  userRoutes(app)

  // Has to be last
  notFoundRoute(app)
}
