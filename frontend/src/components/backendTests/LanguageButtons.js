import React from 'react'
import { useDispatch } from 'react-redux'
import { t } from 'ttag'
import { setLanguage } from '../../actions'

export default function LanguageButtons() {
  const dispatch = useDispatch()

  return (
    <div className="language-buttons">
      <h3>{t`Language`}</h3>
      <button
        type="button"
        onClick={() => dispatch(setLanguage('en'))}
      >{t`English`}</button>
      &nbsp;
      <button
        type="button"
        onClick={() => dispatch(setLanguage('pt-BR'))}
      >{t`Portuguese`}</button>
      &nbsp;
      <button
        type="button"
        onClick={() => dispatch(setLanguage('es'))}
      >{t`Spanish`}</button>
    </div>
  )
}
