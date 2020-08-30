import 'services/i18n'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import Redux from 'providers/Redux'
import Routes from 'components/Routes'
import { getStorageLanguage } from 'services/language'
import { setI18nLanguage } from 'services/i18n'
import * as serviceWorker from './serviceWorker'

setI18nLanguage(getStorageLanguage())

ReactDOM.render(
  <StrictMode>
    <Redux>
      <Routes />
    </Redux>
  </StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
