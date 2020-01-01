import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import BackendTest from './BackendTest'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={BackendTest} />
    </BrowserRouter>
  )
}

export default Routes
