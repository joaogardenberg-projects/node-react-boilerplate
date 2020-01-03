const mongoose = require('mongoose')
const validation = require('./validations/user')
const Schema = require('./schema')
const ImageSchema = require('./image')
const methods = require('./methods/user')
const { SIGN_IN_PROVIDERS } = require('../../config/constants')

const UserSchema = Schema(
  {
    name: {
      ...validation.name,
      type: String
    },
    picture: {
      ...validation.picture,
      type: ImageSchema
    },
    email: {
      ...validation.email,
      type: String
    },
    password: {
      ...validation.password,
      type: String
    },
    googleId: {
      ...validation.googleId,
      type: String
    },
    facebookId: {
      ...validation.facebookId,
      type: String
    },
    oauthEmail: {
      ...validation.oauthEmail,
      type: String
    },
    signInProvider: {
      ...validation.signInProvider,
      type: String,
      default: SIGN_IN_PROVIDERS[0]
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
