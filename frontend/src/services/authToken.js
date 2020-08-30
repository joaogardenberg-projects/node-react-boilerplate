import Storage from './storage'

export const getAuthToken = () => Storage.get('session')

export const setAuthToken = (token) => Storage.set('session', token)

export const removeAuthToken = () => Storage.remove('session')

export default { getAuthToken, setAuthToken, removeAuthToken }
