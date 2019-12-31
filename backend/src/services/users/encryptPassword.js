const bcrypt = require('bcryptjs')
const pepperPassword = require('./pepperPassword')

module.exports = (password) =>
  password.startsWith('$2a$')
    ? password
    : bcrypt.hashSync(pepperPassword(password), 10)
