module.exports = ({
  Model,
  sanitize,
  query = ({ id }) => ({ _id: id }),
  fallbackQuery = ({ id }) => ({ _id: id })
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

    return sanitize(record)
  }
}
