import {
  setStorageLanguage,
  getStorageLocalLanguage,
  setStorageLocalLanguage
} from '../services/language'
import { setI18nLanguage } from '../services/i18n'
import {
  GET_CURRENT_USER_SUCCEEDED,
  SIGN_IN_LOCAL_SUCCEEDED,
  SIGN_IN_GOOGLE_SUCCEEDED,
  SIGN_IN_FACEBOOK_SUCCEEDED,
  SIGN_OUT_SUCCEEDED,
  UPDATE_CURRENT_USER_SUCCEEDED,
  DESTROY_CURRENT_USER_SUCCEEDED,
  SET_LOCAL_LANGUAGE
} from '../actions/types'

export default (state = getStorageLocalLanguage(), { type, payload }) => {
  switch (type) {
    case SET_LOCAL_LANGUAGE:
      setStorageLocalLanguage(payload)
      setStorageLanguage(payload)
      setI18nLanguage(payload)
      return payload

    case GET_CURRENT_USER_SUCCEEDED:
    case SIGN_IN_LOCAL_SUCCEEDED:
    case SIGN_IN_GOOGLE_SUCCEEDED:
    case SIGN_IN_FACEBOOK_SUCCEEDED:
    case UPDATE_CURRENT_USER_SUCCEEDED:
      setStorageLanguage(payload.language)
      setI18nLanguage(payload.language)
      return payload.language

    case SIGN_OUT_SUCCEEDED:
    case DESTROY_CURRENT_USER_SUCCEEDED:
      const localLanguage = getStorageLocalLanguage()
      setStorageLanguage(localLanguage)
      setI18nLanguage(localLanguage)
      return localLanguage

    default:
      return state
  }
}
