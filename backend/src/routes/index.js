const authRoutes = require('./auth')
const userRoutes = require('./users')

module.exports = (app) => {
  authRoutes(app)
  userRoutes(app)
}
