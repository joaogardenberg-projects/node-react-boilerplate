const { JWT_KEY } = require('../../config')

module.exports = (id) => {
  return `${JWT_KEY}:${id}`
}
