const { EMAIL_REGEX } = require('../../../config/regex')
const { LOGIN_PROVIDERS } = require('../../../config/constants')

module.exports = {
  name: {
    required: [true, 'Name required']
  },
  email: {
    index: true,
    unique: [true, "There's already an account with this email ({VALUE})"],
    uniqueCaseInsensitive: true,
    required: [true, 'Email required'],
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
  instagramId: {
    required: [
      function() {
        return this.loginProvider === 'instagram'
      },
      'Instagram ID required'
    ]
  },
  loginProviders: {
    required: [true, 'Login provider required'],
    validate: {
      validator: (loginProviders) => {
        return (
          loginProviders.length &&
          loginProviders.every(
            (provider) => LOGIN_PROVIDERS.indexOf(provider) > -1
          )
        )
      },
      message: 'Only local, google, facebook and instagram allowed'
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
