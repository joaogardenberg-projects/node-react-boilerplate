import React, { Component, Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { getCurrentUser } from '../actions'

const OAuthCallback = lazy(() => import('./auth/OAuthCallback'))
const BackendTests = lazy(() => import('./backendTests/BackendTests'))

class Routes extends Component {
  componentDidMount() {
    const {
      auth: { isFetching, isPresent }
    } = this.props

    !isFetching && !isPresent && this.props.getCurrentUser()
  }

  render() {
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
}

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { getCurrentUser })(Routes)
