const bcrypt = require('bcryptjs')
const saltPassword = require('./saltPassword')

module.exports = (password) =>
  password.startsWith('$2a$')
    ? password
    : bcrypt.hashSync(saltPassword(password), 10)
