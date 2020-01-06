import { SET_LOCAL_LANGUAGE } from './types'
import { updateCurrentUser } from '.'

export const setLanguage = (language) => (dispatch, getState) => {
  const { isPresent } = getState().auth

  if (isPresent) {
    return dispatch(updateCurrentUser({ fields: { language } }))
  }

  dispatch({ type: SET_LOCAL_LANGUAGE, payload: language })
}
