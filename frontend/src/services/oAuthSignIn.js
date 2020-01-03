import { BASE_URL } from './api'

export default (type) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(null)
    }, 30000)

    const _resolve = (event) => {
      clearTimeout(timeout)
      resolve(event)
    }

    window.removeEventListener('message', _resolve)

    window.open(
      `${BASE_URL}/auth/${type}`,
      `${type} sign in`,
      'toolbar=no, menubar=no, width=600, height=700, top=100, left=100'
    )

    window.addEventListener('message', (event) => _resolve(event), false)
  })
