const requireSignIn = require('middlewares/requireSignIn')
const requireAdmin = require('middlewares/requireAdmin')

module.exports = ({
  app,
  routeName,
  controller,
  requireSignInRoutes = [],
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
  requireSignInRoutes.forEach((route) => middlewares[route].push(requireSignIn))

  app.get(`/${routeName}`, ...middlewares.index, controller.index)
  app.get(`/${routeName}/:id`, ...middlewares.show, controller.show)
  app.post(`/${routeName}`, ...middlewares.create, controller.create)
  app.put(`/${routeName}/:id`, ...middlewares.update, controller.update)
  app.patch(`/${routeName}/:id`, ...middlewares.update, controller.update)
  app.delete(`/${routeName}/:id`, ...middlewares.destroy, controller.destroy)
}
