const sanitize = require('./sanitize')
const sanitizeErrors = require('services/common/sanitizeErrors')

module.exports = async (currentUser, attrs) => {
  if (!currentUser) {
    return null
  }

  currentUser.set(attrs)

  const _attrs = Object.keys(currentUser._doc)
    .filter((attr) => attr !== '__v')
    .join(' ')

  if (!currentUser.isModified(_attrs)) {
    return sanitize(currentUser)
  }

  try {
    await currentUser.save()
  } catch ({ errors, name, errmsg }) {
    return errmsg
      ? sanitizeErrors.errmsg({ name, errmsg })
      : sanitizeErrors.validation({ errors })
  }

  return sanitize(currentUser)
}
