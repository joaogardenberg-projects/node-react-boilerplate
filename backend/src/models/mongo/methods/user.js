const commonMethods = require('./common')
const validatePassword = require('services/users/validatePassword')
const encryptPassword = require('services/users/encryptPassword')

module.exports = (UserSchema) => {
  commonMethods(UserSchema)

  UserSchema.methods.validPassword = function (password) {
    return validatePassword(password, this.password)
  }

  UserSchema.post('validate', function (doc) {
    if (doc.password) {
      doc.password = encryptPassword(doc.password)
    }
  })
}
