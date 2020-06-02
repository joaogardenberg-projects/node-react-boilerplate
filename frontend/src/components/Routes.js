import React, { useEffect, Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { getCurrentUser } from 'actions'

const OAuthCallback = lazy(() => import('./auth/OAuthCallback'))
const BackendTests = lazy(() => import('./backendTests/BackendTests'))

export default function Routes() {
  const dispatch = useDispatch()
  useSelector(({ language }) => language)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  return (
    <Router>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Route path="/backend_tests" component={BackendTests} />
          <Route path="/auth/callback" component={OAuthCallback} />
          <Redirect to="/backend_tests" />
        </Switch>
      </Suspense>
    </Router>
  )
}
