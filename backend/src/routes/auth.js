const AuthController = require('../controllers/auth')
const requireLogin = require('../middlewares/requireLogin')

module.exports = (app) => {
  app.get('/auth', requireLogin, AuthController.currentUser)
  app.post('/auth', AuthController.login)
  app.get('/auth/google', AuthController.loginGoogle)
  app.get('/auth/google/callback', AuthController.googleCallback)
  app.get('/auth/facebook', AuthController.loginFacebook)
  app.get('/auth/facebook/callback', AuthController.facebookCallback)
  app.delete('/auth', requireLogin, AuthController.logout)
}
