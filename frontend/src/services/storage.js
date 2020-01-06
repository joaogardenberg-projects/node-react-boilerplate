import Cookies from 'js-cookie'

export const get = (name) =>
  localStorage ? localStorage.getItem(name) : Cookies.get(name)

export const set = (name, language) => {
  const prevLanguage = get(name)

  if (language === prevLanguage) {
    return false
  }

  if (localStorage) {
    localStorage.setItem(name, language)
  } else {
    Cookies.set(name, language)
  }

  return true
}

export default { get, set }
