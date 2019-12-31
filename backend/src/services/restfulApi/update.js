const sanitizeErrors = require('../common/sanitizeErrors')

module.exports = ({
  Model,
  sanitize,
  query = ({ id }) => ({ id }),
  fallbackQuery = ({ id }) => ({ id })
}) => {
  return async (params, attrs) => {
    let record

    try {
      record = await Model.findOne(query(params))

      if (!record) {
        record = await Model.findOne(fallbackQuery(params))
      }
    } catch (e) {
      return null
    }

    if (!record) {
      return null
    }

    record.set(attrs)

    const _attrs = Object.keys(record._doc)
      .filter((attr) => attr !== '__v')
      .join(' ')

    if (!record.isModified(_attrs)) {
      return sanitize(record)
    }

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
