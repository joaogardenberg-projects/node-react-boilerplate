const { EMAIL_REGEX } = require('../../../config/regex')

module.exports = {
  email: {
    index: true,
    unique: [true, "There's already an account with this email ({VALUE})"],
    uniqueCaseInsensitive: true,
    required: [true, 'Email required'],
    match: [EMAIL_REGEX, 'Invalid email']
  },
  password: {
    required: [true, 'Password required']
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
