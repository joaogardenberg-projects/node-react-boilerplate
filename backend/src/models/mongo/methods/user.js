const commonMethods = require('./common')
const validatePassword = require('services/users/validatePassword')
const encryptPassword = require('services/users/encryptPassword')

module.exports = (Schema) => {
  commonMethods(Schema)

  Schema.methods.validPassword = function (password) {
    return validatePassword(password, this.password)
  }

  Schema.post('validate', function (doc) {
    if (doc.password) {
      doc.password = encryptPassword(doc.password)
    }
  })
}
