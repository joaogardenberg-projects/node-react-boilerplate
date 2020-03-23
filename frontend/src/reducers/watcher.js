export default (state = { watching: true }, action) => {
  if (!action.type.startsWith('@@')) {
    console.log('%cAction:', 'color: #00f', action)
  }

  return state
}
