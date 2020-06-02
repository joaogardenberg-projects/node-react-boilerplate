import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { t } from 'ttag'
import { updateCurrentUser } from 'actions'

export default function CurrentUserButtons() {
  const dispatch = useDispatch()
  const auth = useSelector(({ auth }) => auth)

  const getRandomEmail = () =>
    `email-${Math.floor(Math.random() * 10000) + 1}@domain.com`

  const onUpdateClick = () => {
    const fields = { email: window.prompt(t`New email`, getRandomEmail()) }
    dispatch(updateCurrentUser({ fields }))
  }

  const renderText = () => {
    const { isFetching, isPresent, currentUser } = auth
    return isFetching || currentUser.isFetching
      ? `${t`Loading`}...`
      : isPresent
      ? `${currentUser.name} - ${currentUser.email || currentUser.oAuthEmail}`
      : t`You're not signed in.`
  }

  return (
    <div className="user-buttons">
      <h3>{t`Current user`}</h3>
      <button type="button" onClick={onUpdateClick}>
        {t`Update current user`}
      </button>
      <p>{renderText()}</p>
    </div>
  )
}
