import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  signInLocal,
  signInGoogle,
  signInFacebook,
  signOut
} from '../../actions'

const AuthButtons = ({
  auth,
  signInLocal: _signInLocal,
  signInGoogle: _signInGoogle,
  signInFacebook: _signInFacebook,
  signOut: _signOut
}) => {
  const onSignInLocalClick = () => {
    const email = prompt('Email:', 'initial@user.com')
    const password = prompt('Password:', 'initial')
    _signInLocal({ email, password })
  }

  const renderText = () =>
    auth.isFetching
      ? 'Loading...'
      : auth.isPresent
      ? auth.currentUser.admin
        ? "Congratulations, you're signed in. Oh, and you're an admin!"
        : "Congratulations, you're signed in!"
      : "You're not signed in."

  return (
    <div className="auth-buttons">
      <h3>Auth</h3>
      {auth.isFetching ? null : auth.isPresent ? (
        <button type="button" onClick={_signOut}>
          Sign out
        </button>
      ) : (
        <>
          <button type="button" onClick={onSignInLocalClick}>
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
      )}
      <p>{renderText()}</p>
    </div>
  )
}

AuthButtons.propTypes = {
  auth: PropTypes.object.isRequired,
  signInLocal: PropTypes.func.isRequired,
  signInGoogle: PropTypes.func.isRequired,
  signInFacebook: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, {
  signInLocal,
  signInGoogle,
  signInFacebook,
  signOut
})(AuthButtons)
