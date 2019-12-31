const bcrypt = require('bcryptjs')
const saltPassword = require('./saltPassword')

module.exports = (password, encryptedPassword) =>
  bcrypt.compareSync(saltPassword(password), encryptedPassword)
