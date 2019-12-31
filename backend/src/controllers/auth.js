const _currentUser = require('../services/auth/currentUser')
const _login = require('../services/auth/login')
const _logout = require('../services/auth/logout')

async function currentUser(req, res) {
  const response = await _currentUser(req, res)
  res.send(response)
}

async function login(req, res) {
  const response = await _login(req, res, 'local')
  res.send(response)
}

async function loginGoogle(req, res) {
  const response = await _login(req, res, 'google')
  res.send(response)
}

async function loginFacebook(req, res) {
  const response = await _login(req, res, 'facebook')
  res.send(response)
}

async function loginInstagram(req, res) {
  const response = await _login(req, res, 'instagram')
  res.send(response)
}

function logout(req, res) {
  const response = _logout(req)
  res.send(response)
}

module.exports = {
  currentUser,
  login,
  loginGoogle,
  loginFacebook,
  loginInstagram,
  logout
}
