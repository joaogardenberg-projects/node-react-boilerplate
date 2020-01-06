import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'
import LanguageButtons from './LanguageButtons'
import AuthButtons from './AuthButtons'
import UsersButtons from './UsersButtons'
import CurrentUserButtons from './CurrentUserButtons'

const BackendTests = () => {
  return (
    <div>
      <h1>{t`Backend Tests`}</h1>
      <LanguageButtons />
      <br />
      <AuthButtons />
      <br />
      <UsersButtons />
      <br />
      <CurrentUserButtons />
    </div>
  )
}

BackendTests.propTypes = {}

const mapStateToProps = ({ language }) => ({ language })

export default connect(mapStateToProps)(BackendTests)
