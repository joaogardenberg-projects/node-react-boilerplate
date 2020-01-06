const sanitizeImage = require('../images/sanitize')

module.exports = ({
  _id,
  name,
  email,
  picture,
  googleId,
  facebookId,
  oAuthEmail,
  signInProvider,
  admin,
  language,
  createdAt,
  updatedAt
} = {}) => ({
  id: _id,
  name,
  picture: picture && sanitizeImage(picture),
  email,
  googleId,
  facebookId,
  oAuthEmail,
  signInProvider,
  admin,
  language,
  createdAt,
  updatedAt
})
