const { JWT_REDIS_KEY } = require('config')

module.exports = (id) => {
  return `${JWT_REDIS_KEY}:${id}`
}
