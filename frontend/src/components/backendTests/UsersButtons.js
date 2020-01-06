import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { t } from 'ttag'
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  destroyUser
} from '../../actions'

const UsersButtons = ({
  users,
  fetchUsers: _fetchUsers,
  fetchUser: _fetchUser,
  createUser: _createUser,
  updateUser: _updateUser,
  destroyUser: _destroyUser
}) => {
  const onFetchUsersClick = () => {
    _fetchUsers()
  }

  const onFetchUserClick = () => {
    const id = window.prompt(t`User id`)
    _fetchUser({ id })
  }

  const getRandomEmail = () =>
    `email-${Math.floor(Math.random() * 10000) + 1}@domain.com`

  const onCreateUserClick = () => {
    const fields = {
      email: window.prompt(
        t`User email (the password will be "initial"):`,
        getRandomEmail()
      ),
      password: 'initial',
      name: t`User's name`
    }
    _createUser({ fields })
  }

  const onUpdateUserClick = () => {
    const id = window.prompt(t`User id`)
    const fields = {
      email: window.prompt(t`New email`, getRandomEmail())
    }
    _updateUser({ id, fields })
  }

  const onDestroyUserClick = () => {
    const id = window.prompt(t`User id`)
    _destroyUser({ id })
  }

  const renderUsers = () => {
    const { isFetching, records } = users

    if (isFetching) {
      return <p>{t`Loading users`}...</p>
    }

    if (!Object.keys(records).length) {
      return <p>{t`No users to show. Try fetching!`}</p>
    }

    return (
      <table>
        <thead>
          <tr>
            <th align="left">{t`Name`}</th>
            <th align="left">{t`Email`}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(records).map((id) => {
            if (Object.keys(records[id]).length <= 1) {
              return null
            }

            const { name, email, oAuthEmail } = records[id]

            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{email || oAuthEmail}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div className="users-buttons">
      <h3>{t`Users`}</h3>
      <button type="button" onClick={onFetchUsersClick}>
        {t`Fetch users`}
      </button>
      &nbsp;
      <button type="button" onClick={onFetchUserClick}>
        {t`Fetch user`}
      </button>
      &nbsp;
      <button type="button" onClick={onCreateUserClick}>
        {t`Create user`}
      </button>
      &nbsp;
      <button type="button" onClick={onUpdateUserClick}>
        {t`Update user`}
      </button>
      &nbsp;
      <button type="button" onClick={onDestroyUserClick}>
        {t`Destroy user`}
      </button>
      {renderUsers()}
    </div>
  )
}

UsersButtons.propTypes = {
  users: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  destroyUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ users, language }) => ({ users, language })

export default connect(mapStateToProps, {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  destroyUser
})(UsersButtons)
