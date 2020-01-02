export const getAuthToken = () => localStorage.getItem('session')

export const setAuthToken = (token) => {
  if (token === getAuthToken()) {
    return false
  }

  localStorage.setItem('session', token)
  return true
}

export default { getAuthToken, setAuthToken }
