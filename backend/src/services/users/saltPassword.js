const { PASSWORD_SALT } = require('../../config')

module.exports = (password) => `${password}${PASSWORD_SALT}`
