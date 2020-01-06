import Storage from './storage'

export const getStorageLanguage = () => {
  return Storage.get('language')
}

export const getStorageLocalLanguage = () => {
  return Storage.get('local_language')
}

export const setStorageLanguage = (language) => {
  return Storage.set('language', language)
}

export const setStorageLocalLanguage = (language) => {
  Storage.set('local_language', language)
}

export default {
  getStorageLanguage,
  setStorageLanguage,
  getStorageLocalLanguage,
  setStorageLocalLanguage
}

if (!getStorageLanguage()) {
  setStorageLanguage('en')
}

if (!getStorageLocalLanguage()) {
  setStorageLocalLanguage('en')
}
