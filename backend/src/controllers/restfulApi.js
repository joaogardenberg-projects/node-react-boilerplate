module.exports = ({
  api,
  permittedQuery = (query) => query,
  permittedParams = (params) => params,
  permittedAttrs = (attrs) => attrs
}) => {
  async function index({ query }, res) {
    const records = await api.fetchMany(permittedQuery(query))
    res.status(200).send(records)
  }

  async function show({ params }, res) {
    const record = await api.fetchOne(permittedParams(params))

    if (!record) {
      res.status(404)
    } else {
      res.status(200)
    }

    res.send(record)
  }

  async function create({ body }, res) {
    const record = await api.create(permittedAttrs(body))

    if (record.error) {
      res.status(422)
    } else {
      res.status(201)
    }

    res.send(record)
  }

  async function update({ params, body }, res) {
    const record = await api.update(
      permittedParams(params),
      permittedAttrs(body)
    )

    if (!record) {
      res.status(404)
    } else if (record.error) {
      res.status(422)
    } else {
      res.status(200)
    }

    res.send(record)
  }

  async function destroy({ params }, res) {
    const record = await api.destroy(permittedParams(params))

    if (!record) {
      res.status(404)
    } else {
      res.status(200)
    }

    res.send(record)
  }

  return {
    index,
    show,
    create,
    update,
    destroy
  }
}
