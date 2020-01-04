const authRoutes = require('./auth')
const usersRoutes = require('./users')
const userRoutes = require('./user')

module.exports = (app) => {
  authRoutes(app)
  usersRoutes(app)
  userRoutes(app)
}
