import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import reducers from '../reducers'

const Redux = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(reduxThunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  )
  return <Provider store={store}>{children}</Provider>
}

export default Redux
