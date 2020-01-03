const currentUserService = require('../services/auth/currentUser')
const signInService = require('../services/auth/signIn')
const signOutService = require('../services/auth/signOut')

async function currentUser(req, res) {
  res.send(await currentUserService(req, res))
}

async function signIn(req, res) {
  res.send(await signInService(req, res, 'local'))
}

function signInGoogle(req, res) {
  signInService(req, res, 'google', { scope: ['openid', 'profile', 'email'] })
}

function signInFacebook(req, res) {
  signInService(req, res, 'facebook', { scope: ['email'], display: 'popup' })
}

async function googleCallback(req, res) {
  res.send(await signInService(req, res, 'google'))
}

async function facebookCallback(req, res) {
  res.send(await signInService(req, res, 'facebook'))
}

async function signOut(req, res) {
  res.send(await signOutService(req))
}

module.exports = {
  currentUser,
  signIn,
  signInGoogle,
  signInFacebook,
  googleCallback,
  facebookCallback,
  signOut
}
