const sanitizeImage = require('../images/sanitize')

module.exports = ({
  _id,
  name,
  email,
  picture,
  googleId,
  facebookId,
  instagramId,
  loginProviders,
  admin,
  createdAt,
  updatedAt
} = {}) => ({
  id: _id,
  name,
  picture: sanitizeImage(picture),
  email,
  googleId,
  facebookId,
  instagramId,
  loginProviders,
  admin,
  createdAt,
  updatedAt
})
