import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateCurrentUser } from '../../actions'

const CurrentUserButtons = ({
  auth,
  updateCurrentUser: _updateCurrentUser
}) => {
  const getRandomEmail = () =>
    `email-${Math.floor(Math.random() * 10000) + 1}@domain.com`

  const onUpdateClick = () => {
    const fields = { email: window.prompt('New email:', getRandomEmail()) }
    _updateCurrentUser({ fields })
  }

  const renderText = () => {
    const { isFetching, isPresent, currentUser } = auth
    return isFetching || currentUser.isFetching
      ? 'Loading...'
      : isPresent
      ? `${currentUser.name} - ${currentUser.email || currentUser.oAuthEmail}`
      : "You're not signed in."
  }

  return (
    <div className="user-buttons">
      <h3>Current user</h3>
      <button type="button" onClick={onUpdateClick}>
        Update current user
      </button>
      <p>{renderText()}</p>
    </div>
  )
}

CurrentUserButtons.propTypes = {
  auth: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { updateCurrentUser })(
  CurrentUserButtons
)
