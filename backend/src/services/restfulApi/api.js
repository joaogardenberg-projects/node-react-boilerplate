const fetchMany = require(`./fetchMany`)
const fetchOne = require(`./fetchOne`)
const create = require(`./create`)
const update = require(`./update`)
const destroy = require(`./destroy`)

module.exports = (options) => ({
  fetchMany: fetchMany(options),
  fetchOne: fetchOne(options),
  create: create(options),
  update: update(options),
  destroy: destroy(options)
})
