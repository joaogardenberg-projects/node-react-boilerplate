module.exports = (Schema) => {
  Schema.pre('validate', function(next) {
    const date = new Date()

    if (this.isNew) {
      this.createdAt = date
    }

    this.updatedAt = date

    next()
  })
}
