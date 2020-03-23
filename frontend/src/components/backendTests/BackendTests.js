import React from 'react'
import { t } from 'ttag'
import LanguageButtons from './LanguageButtons'
import AuthButtons from './AuthButtons'
import UsersButtons from './UsersButtons'
import CurrentUserButtons from './CurrentUserButtons'

export default function BackendTests() {
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
