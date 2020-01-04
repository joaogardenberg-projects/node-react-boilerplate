import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { getCurrentUser } from '../actions'
import BackendTests from './backendTests/BackendTests'
import OAuthCallback from './auth/OAuthCallback'

class Routes extends Component {
  componentDidMount() {
    const {
      auth: { isFetching, isPresent }
    } = this.props

    !isFetching && !isPresent && this.props.getCurrentUser()
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={BackendTests} />
        <Route exact path="/auth/callback" component={OAuthCallback} />
      </BrowserRouter>
    )
  }
}

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { getCurrentUser })(Routes)
