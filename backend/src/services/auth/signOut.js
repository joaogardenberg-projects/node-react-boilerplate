const jwt = require('jsonwebtoken')
const { ExtractJwt } = require('passport-jwt')
const jwtRedis = require('./jwtRedis')

const getToken = ExtractJwt.fromAuthHeaderAsBearerToken()

module.exports = (req) => {
  return new Promise((resolve) => {
    jwtRedis.remove(jwt.decode(getToken(req))).then((success) => {
      resolve({ success })
    })
  })
}
