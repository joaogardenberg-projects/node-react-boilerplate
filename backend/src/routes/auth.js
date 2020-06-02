const AuthController = require('controllers/auth')
const requireSignIn = require('middlewares/requireSignIn')

module.exports = (app) => {
  app.get('/auth', requireSignIn, AuthController.currentUser)
  app.post('/auth', AuthController.signIn)
  app.get('/auth/google', AuthController.signInGoogle)
  app.get('/auth/google/callback', AuthController.googleCallback)
  app.get('/auth/facebook', AuthController.signInFacebook)
  app.get('/auth/facebook/callback', AuthController.facebookCallback)
  app.delete('/auth', requireSignIn, AuthController.signOut)
}
