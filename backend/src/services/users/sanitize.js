const sanitizeImage = require('../images/sanitize')

module.exports = ({
  _id,
  name,
  email,
  picture,
  googleId,
  facebookId,
  oauthEmail,
  loginProvider,
  admin,
  createdAt,
  updatedAt
} = {}) => ({
  id: _id,
  name,
  picture: picture && sanitizeImage(picture),
  email,
  googleId,
  facebookId,
  oauthEmail,
  loginProvider,
  admin,
  createdAt,
  updatedAt
})
