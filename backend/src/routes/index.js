const authRoutes = require('./auth')
const userRoutes = require('./users')
const notFoundRoute = require('./notFound')

module.exports = (app) => {
  authRoutes(app)
  userRoutes(app)

  notFoundRoute(app) // Has to be last
}
