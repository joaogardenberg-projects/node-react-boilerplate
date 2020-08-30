import Storage from './storage'

export const getStorageLanguage = () => Storage.get('language')

export const setStorageLanguage = (language) =>
  Storage.set('language', language)

export default {
  getStorageLanguage,
  setStorageLanguage
}

if (!getStorageLanguage()) {
  setStorageLanguage('en')
}
