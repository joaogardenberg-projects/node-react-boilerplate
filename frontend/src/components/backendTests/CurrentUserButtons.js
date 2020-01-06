import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { t } from 'ttag'
import { updateCurrentUser } from '../../actions'

const CurrentUserButtons = ({
  auth,
  updateCurrentUser: _updateCurrentUser
}) => {
  const getRandomEmail = () =>
    `email-${Math.floor(Math.random() * 10000) + 1}@domain.com`

  const onUpdateClick = () => {
    const fields = { email: window.prompt(t`New email`, getRandomEmail()) }
    _updateCurrentUser({ fields })
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

CurrentUserButtons.propTypes = {
  auth: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth, language }) => ({ auth, language })

export default connect(mapStateToProps, { updateCurrentUser })(
  CurrentUserButtons
)
