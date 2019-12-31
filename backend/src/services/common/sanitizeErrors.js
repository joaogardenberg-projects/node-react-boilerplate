function errmsg({ name, errmsg }) {
  return { error: { [name]: errmsg } }
}

function validation({ errors }) {
  return {
    error: Object.keys(errors)
      .map((key) => ({ [key]: errors[key].message }))
      .reduce((final, chunk) => ({ ...final, ...chunk }), {})
  }
}

module.exports = {
  errmsg,
  validation
}
