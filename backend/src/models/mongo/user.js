const mongoose = require('mongoose')
const validation = require('./validations/user')
const Schema = require('./schema')
const methods = require('./methods/user')

const UserSchema = Schema(
  {
    email: {
      ...validation.email,
      type: String
    },
    password: {
      ...validation.password,
      type: String
    },
    admin: {
      ...validation.admin,
      type: Boolean,
      default: false
    },
    createdAt: {
      ...validation.createdAt,
      type: Date
    },
    updatedAt: {
      ...validation.updatedAt,
      type: Date
    }
  },
  validation.email.unique[1]
)

methods(UserSchema)

module.exports = mongoose.model('users', UserSchema)
