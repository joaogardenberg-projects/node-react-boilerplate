const defaultRoutes = require('./default')
const notFoundRoute = require('./notFound')

module.exports = (app) => {
  defaultRoutes(app)

  notFoundRoute(app) // Has to be last
}
