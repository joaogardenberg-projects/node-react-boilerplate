import { SET_LOCAL_LANGUAGE } from './types'
import { updateCurrentUser } from '.'

export const setLanguage = (language) => (dispatch, getState) => {
  const { isPresent: isSignedIn } = getState().auth

  if (isSignedIn) {
    return dispatch(updateCurrentUser({ fields: { language } }))
  }

  dispatch({ type: SET_LOCAL_LANGUAGE, payload: language })
}
