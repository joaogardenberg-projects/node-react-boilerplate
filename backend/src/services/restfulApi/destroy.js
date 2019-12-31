module.exports = ({
  Model,
  sanitize,
  query = ({ id }) => ({ id }),
  fallbackQuery = ({ id }) => ({ id })
}) => {
  return async (params) => {
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

    try {
      await record.remove()
    } catch (e) {
      return null
    }

    return sanitize(record)
  }
}
