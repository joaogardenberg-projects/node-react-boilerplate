import Cookies from 'js-cookie'

export const get = (name) =>
  localStorage ? localStorage.getItem(name) : Cookies.get(name)

export const set = (name, value) => {
  try {
    if (value === get(name)) {
      return false
    }

    if (localStorage) {
      localStorage.setItem(name, value)
    } else {
      Cookies.set(name, value)
    }

    return true
  } catch (e) {
    return false
  }
}

export const remove = (name) => {
  try {
    if (!get(name)) {
      return false
    }

    if (localStorage) {
      localStorage.removeItem(name)
    } else {
      Cookies.remove(name)
    }

    return true
  } catch (e) {
    return false
  }
}

export default {
  get,
  set,
  remove
}
