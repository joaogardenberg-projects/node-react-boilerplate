import React, { useState } from 'react'
import { connect } from 'react-redux'

const BackendTest = () => {
  const [signedIn, signIn] = useState(false)

  const text = signedIn
    ? "Congratulations, you're signed in!"
    : "You're not signed in."

  const renderButtons = signedIn ? (
    <button type="button" onClick={() => signIn(false)}>
      Sign out
    </button>
  ) : (
    <>
      <button type="button" onClick={() => signIn(true)}>
        Sign in
      </button>
      &nbsp;
      <button type="button" onClick={() => signIn(true)}>
        Google sign in
      </button>
      &nbsp;
      <button type="button" onClick={() => signIn(true)}>
        Facebook sign in
      </button>
    </>
  )

  return (
    <div>
      <h1>Backend Tests</h1>
      <p>{text}</p>
      {renderButtons}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return state
}

export default connect(mapStateToProps)(BackendTest)
