const AuthController = require('../controllers/auth')
const requireLogin = require('../middlewares/requireLogin')

module.exports = (app) => {
  app.get('/auth', requireLogin, AuthController.currentUser)
  app.post('/auth', AuthController.login)
  app.post('/auth/google', AuthController.loginGoogle)
  app.post('/auth/facebook', AuthController.loginFacebook)
  app.post('/auth/instagram', AuthController.loginInstagram)
  app.delete('/auth', requireLogin, AuthController.logout)
}
