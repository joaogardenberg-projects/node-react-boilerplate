import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { t } from 'ttag'
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
    const email = prompt(t`Email`, 'initial@user.com')
    const password = prompt(t`Password`, 'initial')
    _signInLocal({ email, password })
  }

  const renderText = () =>
    auth.isFetching
      ? `${t`Loading`}...`
      : auth.isPresent
      ? auth.currentUser.admin
        ? t`Congratulations, you're signed in. Oh, and you're an admin!`
        : t`Congratulations, you're signed in!`
      : t`You're not signed in.`

  return (
    <div className="auth-buttons">
      <h3>{t`Auth`}</h3>
      {auth.isFetching ? null : auth.isPresent ? (
        <button type="button" onClick={_signOut}>
          {t`Sign out`}
        </button>
      ) : (
        <>
          <button type="button" onClick={onSignInLocalClick}>
            {t`Sign in`}
          </button>
          &nbsp;
          <button type="button" onClick={_signInGoogle}>
            {t`Google sign in`}
          </button>
          &nbsp;
          <button type="button" onClick={_signInFacebook}>
            {t`Facebook sign in`}
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

const mapStateToProps = ({ auth, language }) => ({ auth, language })

export default connect(mapStateToProps, {
  signInLocal,
  signInGoogle,
  signInFacebook,
  signOut
})(AuthButtons)
