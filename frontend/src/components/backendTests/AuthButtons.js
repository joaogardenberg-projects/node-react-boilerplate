import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { t } from 'ttag'
import {
  signInLocal,
  signInGoogle,
  signInFacebook,
  signOut
} from '../../actions'

export default function AuthButtons() {
  const dispatch = useDispatch()
  const auth = useSelector(({ auth }) => auth)

  const onSignInLocalClick = () => {
    const email = prompt(t`Email`, 'initial@user.com')
    const password = prompt(t`Password`, 'initial')
    dispatch(signInLocal({ email, password }))
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
        <button type="button" onClick={() => dispatch(signOut())}>
          {t`Sign out`}
        </button>
      ) : (
        <>
          <button type="button" onClick={onSignInLocalClick}>
            {t`Sign in`}
          </button>
          &nbsp;
          <button type="button" onClick={() => dispatch(signInGoogle())}>
            {t`Google sign in`}
          </button>
          &nbsp;
          <button type="button" onClick={() => dispatch(signInFacebook())}>
            {t`Facebook sign in`}
          </button>
        </>
      )}
      <p>{renderText()}</p>
    </div>
  )
}
