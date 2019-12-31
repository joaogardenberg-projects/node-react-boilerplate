const requireLogin = require('../middlewares/requireLogin')
const requireAdmin = require('../middlewares/requireAdmin')

module.exports = ({
  app,
  routeName,
  controller,
  requireLoginRoutes = [],
  requireAdminRoutes = []
}) => {
  const middlewares = {
    index: [],
    show: [],
    create: [],
    update: [],
    destroy: []
  }

  requireAdminRoutes.forEach((route) => middlewares[route].push(requireAdmin))
  requireLoginRoutes.forEach((route) => middlewares[route].push(requireLogin))

  app.get(`/${routeName}`, ...middlewares.index, controller.index)
  app.get(`/${routeName}/:id`, ...middlewares.show, controller.show)
  app.post(`/${routeName}`, ...middlewares.create, controller.create)
  app.put(`/${routeName}/:id`, ...middlewares.update, controller.update)
  app.patch(`/${routeName}/:id`, ...middlewares.update, controller.update)
  app.delete(`/${routeName}/:id`, ...middlewares.destroy, controller.destroy)
}
