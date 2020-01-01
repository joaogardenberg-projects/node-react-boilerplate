import React from 'react'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'

const Redux = ({ children, initialState = {} }) => {
  const store = createStore(reducers, initialState, applyMiddleware(reduxThunk))
  return <Provider store={store}>{children}</Provider>
}

export default Redux
