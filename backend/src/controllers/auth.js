const currentUserService = require('../services/auth/currentUser')
const loginService = require('../services/auth/login')
const logoutService = require('../services/auth/logout')

async function currentUser(req, res) {
  res.send(await currentUserService(req, res))
}

async function login(req, res) {
  res.send(await loginService(req, res, 'local'))
}

function loginGoogle(req, res) {
  loginService(req, res, 'google', { scope: ['openid', 'profile', 'email'] })
}

function loginFacebook(req, res) {
  loginService(req, res, 'facebook', { scope: ['email'], display: 'popup' })
}

async function googleCallback(req, res) {
  res.send(await loginService(req, res, 'google'))
}

async function facebookCallback(req, res) {
  res.send(await loginService(req, res, 'facebook'))
}

async function logout(req, res) {
  res.send(await logoutService(req))
}

module.exports = {
  currentUser,
  login,
  loginGoogle,
  loginFacebook,
  googleCallback,
  facebookCallback,
  logout
}
