const restfulApiRoutes = require('./restfulApi')
const UsersController = require('controllers/users')

module.exports = (app) => {
  restfulApiRoutes({
    app,
    routeName: 'users',
    controller: UsersController,
    requireSignInRoutes: [],
    requireAdminRoutes: ['index', 'show', 'create', 'update', 'destroy']
  })
}
