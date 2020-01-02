import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import BackendTest from './BackendTest'
import OAuthCallback from './auth/OAuthCallback'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={BackendTest} />
      <Route exact path="/auth/callback" component={OAuthCallback} />
    </BrowserRouter>
  )
}

export default Routes
