import { t } from 'ttag'
import config from 'config'

export default (type) =>
  new Promise((resolve, reject) => {
    window.removeEventListener('message', onMessageReceived)

    const openedWindow = window.open(
      `${config.BASE_BACKEND_URL}/auth/${type}`,
      `${type} sign in`,
      'toolbar=no, menubar=no, width=600, height=700, top=100, left=100'
    )

    const timeout = setTimeout(() => {
      clearStuff()
      reject({ reason: t`Timeout` })
    }, 60000)

    const interval = setInterval(() => {
      if (openedWindow.closed) {
        clearStuff()
        reject({ reason: t`Window closed` })
      }
    }, 1000)

    window.addEventListener('message', onMessageReceived, false)

    function onMessageReceived({ data: { type, payload, source } }) {
      if (type === 'OAUTH' && source === 'oauth-callback') {
        clearStuff()
        resolve(payload)
      }
    }

    function clearStuff() {
      window.removeEventListener('message', onMessageReceived)
      clearTimeout(timeout)
      clearInterval(interval)
      openedWindow.close()
    }
  })
