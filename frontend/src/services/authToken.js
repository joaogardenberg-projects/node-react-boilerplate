export const getAuthToken = () => localStorage.getItem('session')

export const setAuthToken = (token) => {
  if (token === getAuthToken()) {
    return false
  }

  localStorage.setItem('session', token)
  return true
}

export const removeAuthToken = () =>
  getAuthToken() && localStorage.removeItem('session')

export default { getAuthToken, setAuthToken, removeAuthToken }
