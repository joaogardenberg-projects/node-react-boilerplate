import Storage from './storage'

export const getStorageLanguage = () => {
  return Storage.get('language')
}

export const setStorageLanguage = (language) => {
  return Storage.set('language', language)
}

export default {
  getStorageLanguage,
  setStorageLanguage
}

if (!getStorageLanguage()) {
  setStorageLanguage('en')
}
