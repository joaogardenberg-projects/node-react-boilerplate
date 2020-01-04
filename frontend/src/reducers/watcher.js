export default (state = { watching: true }, action) => {
  if (!action.type.startsWith('@@')) {
    console.log(action)
  }

  return state
}
