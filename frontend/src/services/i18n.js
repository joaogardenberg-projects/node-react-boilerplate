import { addLocale, useLocale } from 'ttag'
import ptBR from '../config/i18n/pt-BR.po.json'

const availableLanguages = []

export function setI18nLanguage(language) {
  const languages = { 'pt-BR': ptBR }

  if (language !== 'en' && !availableLanguages.includes(language)) {
    const translationObject = languages[language]
    availableLanguages.push(language)
    addLocale(language, translationObject)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLocale(language)
}

export default { setI18nLanguage }
