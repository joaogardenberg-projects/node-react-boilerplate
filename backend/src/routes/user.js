const UserController = require('../controllers/user')
const requireSignIn = require('../middlewares/requireSignIn')

module.exports = (app) => {
  app.put('/user', requireSignIn, UserController.update)
  app.patch('/user', requireSignIn, UserController.update)
}
