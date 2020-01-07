import { addLocale, useLocale } from 'ttag'
import es from '../config/i18n/objects/es.po.json'
import ptBR from '../config/i18n/objects/pt-BR.po.json'

const availableLanguages = []

export function setI18nLanguage(language) {
  const languages = { es, 'pt-BR': ptBR }

  if (language !== 'en' && !availableLanguages.includes(language)) {
    const translationObject = languages[language]
    availableLanguages.push(language)
    addLocale(language, translationObject)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLocale(language)
}

export default { setI18nLanguage }
