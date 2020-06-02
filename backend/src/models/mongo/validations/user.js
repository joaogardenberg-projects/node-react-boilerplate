const { EMAIL_REGEX } = require('config/regex')
const { SIGN_IN_PROVIDERS, LANGUAGES } = require('config/constants')

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
        return this.signInProvider === 'local'
      },
      'Email required'
    ],
    match: [EMAIL_REGEX, 'Invalid email']
  },
  password: {
    required: [
      function() {
        return this.signInProvider === 'local'
      },
      'Password required'
    ]
  },
  googleId: {
    required: [
      function() {
        return this.signInProvider === 'google'
      },
      'Google ID required'
    ]
  },
  facebookId: {
    required: [
      function() {
        return this.signInProvider === 'facebook'
      },
      'Facebook ID required'
    ]
  },
  oAuthEmail: {
    match: [EMAIL_REGEX, 'Invalid email']
  },
  signInProvider: {
    required: [true, 'Sign in provider required'],
    enum: {
      values: SIGN_IN_PROVIDERS,
      message: 'Only local, google, and facebook allowed'
    }
  },
  admin: {
    required: [true, 'Admin or not?']
  },
  language: {
    required: [true, 'Language required'],
    enum: {
      values: LANGUAGES,
      message: 'Invalid language'
    }
  },
  createdAt: {
    required: true
  },
  updatedAt: {
    required: true
  }
}
