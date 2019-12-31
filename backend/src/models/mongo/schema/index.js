const { Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

module.exports = (schemaAttributes, uniqueMessage) => {
  const ModelSchema = new Schema(schemaAttributes)

  ModelSchema.plugin(uniqueValidator, {
    message: uniqueMessage || '{PATH} ({VALUE}) should be unique'
  })

  return ModelSchema
}
