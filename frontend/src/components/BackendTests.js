import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  getCurrentUser,
  signInLocal,
  signInGoogle,
  signInFacebook,
  signOut
} from '../actions'

const BackendTests = ({
  currentUser,
  getCurrentUser: _getCurrentUser,
  signInLocal: _signInLocal,
  signInGoogle: _signInGoogle,
  signInFacebook: _signInFacebook,
  signOut: _signOut
}) => {
  useEffect(() => {
    !currentUser.present && !currentUser.loading && _getCurrentUser()
  }, [currentUser.present, currentUser.loading, _getCurrentUser])

  const onSignInLocal = () => {
    const email = prompt('Email:')
    const password = prompt('Password:')
    _signInLocal({ email, password })
  }

  const renderText = () =>
    currentUser.loading
      ? 'Loading...'
      : currentUser.present
      ? "Congratulations, you're signed in!"
      : "You're not signed in."

  const renderButtons = () =>
    currentUser.loading ? null : currentUser.present ? (
      <button type="button" onClick={_signOut}>
        Sign out
      </button>
    ) : (
      <>
        <button type="button" onClick={onSignInLocal}>
          Sign in
        </button>
        &nbsp;
        <button type="button" onClick={_signInGoogle}>
          Google sign in
        </button>
        &nbsp;
        <button type="button" onClick={_signInFacebook}>
          Facebook sign in
        </button>
      </>
    )

  return (
    <div>
      <h1>Backend Tests</h1>
      <p>{renderText()}</p>
      {renderButtons()}
    </div>
  )
}

BackendTests.propTypes = {
  currentUser: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  signInLocal: PropTypes.func.isRequired,
  signInGoogle: PropTypes.func.isRequired,
  signInFacebook: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth: { currentUser } }) => {
  return { currentUser }
}

export default connect(mapStateToProps, {
  getCurrentUser,
  signInLocal,
  signInGoogle,
  signInFacebook,
  signOut
})(BackendTests)
