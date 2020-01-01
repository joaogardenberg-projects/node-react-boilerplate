import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import Redux from './providers/Redux'
import Routes from './components/Routes'

ReactDOM.render(
  <Redux>
    <Routes />
  </Redux>,
  document.getElementById('root')
)

serviceWorker.unregister()
