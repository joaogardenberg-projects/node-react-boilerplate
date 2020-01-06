import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { t } from 'ttag'
import { setLanguage } from '../../actions'

const LanguageButtons = ({ setLanguage: _setLanguage }) => {
  return (
    <div className="language-buttons">
      <h3>{t`Language`}</h3>
      <button
        type="button"
        onClick={() => _setLanguage('en')}
      >{t`English`}</button>
      &nbsp;
      <button
        type="button"
        onClick={() => _setLanguage('pt-BR')}
      >{t`Portuguese`}</button>
    </div>
  )
}

LanguageButtons.propTypes = {
  setLanguage: PropTypes.func.isRequired
}

const mapStateToProps = ({ language }) => ({ language })

export default connect(mapStateToProps, { setLanguage })(LanguageButtons)
