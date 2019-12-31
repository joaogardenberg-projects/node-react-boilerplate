const restfulApiRoutes = require('./restfulApi')
const DefaultController = require('../controllers/default')

module.exports = (app) => {
  restfulApiRoutes({
    app,
    routeName: 'default',
    controller: DefaultController,
    requireAdminRoutes: [],
    requireLoginRoutes: []
  })
}
