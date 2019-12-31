const restfulApiRoutes = require('./restfulApi')
const UsersController = require('../controllers/users')

module.exports = (app) => {
  restfulApiRoutes({
    app,
    routeName: 'users',
    controller: UsersController,
    requireLoginRoutes: [],
    requireAdminRoutes: ['index', 'show', 'create', 'update', 'destroy']
  })
}
