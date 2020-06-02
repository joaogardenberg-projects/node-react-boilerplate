const sanitizeErrors = require('services/common/sanitizeErrors')

module.exports = ({ Model, sanitize }) => {
  return async (params) => {
    const record = new Model(params)

    try {
      await record.save()
    } catch ({ errors, name, errmsg }) {
      return errmsg
        ? sanitizeErrors.errmsg({ name, errmsg })
        : sanitizeErrors.validation({ errors })
    }

    return sanitize(record)
  }
}
