const bcrypt = require('bcryptjs')
const pepperPassword = require('./pepperPassword')

module.exports = (password, encryptedPassword) =>
  bcrypt.compareSync(pepperPassword(password), encryptedPassword)
