import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import BackendTests from './BackendTests'
import OAuthCallback from './auth/OAuthCallback'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={BackendTests} />
      <Route exact path="/auth/callback" component={OAuthCallback} />
    </BrowserRouter>
  )
}

export default Routes
