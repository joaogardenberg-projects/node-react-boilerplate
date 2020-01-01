const { EMAIL_REGEX } = require('../../../config/regex')
const { LOGIN_PROVIDERS } = require('../../../config/constants')

module.exports = {
  name: {
    required: [true, 'Name required']
  },
  email: {
    index: true,
    unique: [true, "There's already an account with this email"],
    uniqueCaseInsensitive: true,
    sparse: true,
    required: [
      function() {
        return this.loginProvider === 'local'
      },
      'Email required'
    ],
    match: [EMAIL_REGEX, 'Invalid email']
  },
  password: {
    required: [
      function() {
        return this.loginProvider === 'local'
      },
      'Password required'
    ]
  },
  googleId: {
    required: [
      function() {
        return this.loginProvider === 'google'
      },
      'Google ID required'
    ]
  },
  facebookId: {
    required: [
      function() {
        return this.loginProvider === 'facebook'
      },
      'Facebook ID required'
    ]
  },
  oauthEmail: {
    match: [EMAIL_REGEX, 'Invalid email']
  },
  loginProvider: {
    required: [true, 'Login provider required'],
    enum: {
      values: LOGIN_PROVIDERS,
      message: 'Only local, google, and facebook allowed'
    }
  },
  admin: {
    required: [true, 'Admin or not?']
  },
  createdAt: {
    required: true
  },
  updatedAt: {
    required: true
  }
}
