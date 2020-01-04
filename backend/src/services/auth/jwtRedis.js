const redisClient = require('../../models/redis')
const getRedisKey = require('./getRedisKey')

const TIMEOUT = 5000

const add = ({ _id: id, iat }) => {
  return new Promise((resolve) => {
    try {
      const timeout = setTimeout(() => {
        resolve(false)
      }, TIMEOUT)

      redisClient.SADD(getRedisKey(id), iat, (_, success) => {
        clearTimeout(timeout)
        resolve(!!success)
      })
    } catch (e) {
      resolve(false)
    }
  })
}

const remove = ({ _id: id, iat }) => {
  return new Promise((resolve) => {
    try {
      const timeout = setTimeout(() => {
        resolve(false)
      }, TIMEOUT)

      redisClient.SREM(getRedisKey(id), iat, (_, success) => {
        clearTimeout(timeout)
        resolve(!!success)
      })
    } catch (e) {
      resolve(false)
    }
  })
}

const check = ({ _id: id, iat }) => {
  return new Promise((resolve) => {
    try {
      const timeout = setTimeout(() => {
        resolve(false)
      }, TIMEOUT)

      redisClient.SISMEMBER(getRedisKey(id), iat, (_, isMember) => {
        clearTimeout(timeout)
        resolve(!!isMember)
      })
    } catch (e) {
      resolve(false)
    }
  })
}

module.exports = { add, remove, check }
