import React from 'react'
import AuthButtons from './AuthButtons'
import UsersButtons from './UsersButtons'
import CurrentUserButtons from './CurrentUserButtons'

const BackendTests = () => {
  return (
    <div>
      <h1>Backend Tests</h1>
      <AuthButtons />
      <br />
      <UsersButtons />
      <br />
      <CurrentUserButtons />
    </div>
  )
}

BackendTests.propTypes = {}

export default BackendTests
