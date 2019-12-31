const { PASSWORD_PEPPER } = require('../../config')

module.exports = (password) => `${password}${PASSWORD_PEPPER}`
