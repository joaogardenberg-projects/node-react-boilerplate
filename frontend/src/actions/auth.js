import { t } from 'ttag'
import API from '../services/api'
import oAuthSignIn from '../services/oAuthSignIn'
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken
} from '../services/authToken'
import {
  GET_CURRENT_USER_SENT,
  GET_CURRENT_USER_SUCCEEDED,
  GET_CURRENT_USER_FAILED,
  SIGN_IN_LOCAL_SENT,
  SIGN_IN_LOCAL_SUCCEEDED,
  SIGN_IN_LOCAL_FAILED,
  SIGN_IN_GOOGLE_SENT,
  SIGN_IN_GOOGLE_SUCCEEDED,
  SIGN_IN_GOOGLE_FAILED,
  SIGN_IN_FACEBOOK_SENT,
  SIGN_IN_FACEBOOK_SUCCEEDED,
  SIGN_IN_FACEBOOK_FAILED,
  SIGN_OUT_SENT,
  SIGN_OUT_SUCCEEDED,
  SIGN_OUT_FAILED
} from './types'

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CURRENT_USER_SENT })

    if (!getAuthToken()) {
      throw new Error(t`Not signed in`)
    }

    const { data: user } = await API.get('/auth')

    dispatch({ type: GET_CURRENT_USER_SUCCEEDED, payload: user })
  } catch (error) {
    removeAuthToken()
    dispatch({ type: GET_CURRENT_USER_FAILED, payload: { error } })
  }
}

export const signInLocal = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_LOCAL_SENT })

    const {
      data: { user, token }
    } = await API.post('/auth', { email, password })

    setAuthToken(token)
    dispatch({ type: SIGN_IN_LOCAL_SUCCEEDED, payload: user })
  } catch (error) {
    removeAuthToken()
    dispatch({ type: SIGN_IN_LOCAL_FAILED, payload: { error } })
  }
}

export const signInGoogle = () => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_GOOGLE_SENT })

    const queryString = await oAuthSignIn('google')

    if (!queryString) {
      throw new Error(t`Something went wrong`)
    }

    const {
      data: { user, token }
    } = await API.get(`/auth/google/callback${queryString}`)

    setAuthToken(token)
    dispatch({ type: SIGN_IN_GOOGLE_SUCCEEDED, payload: user })
  } catch (error) {
    removeAuthToken()
    dispatch({ type: SIGN_IN_GOOGLE_FAILED, payload: { error } })
  }
}

export const signInFacebook = () => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_FACEBOOK_SENT })

    const queryString = await oAuthSignIn('facebook')

    if (!queryString) {
      throw new Error(t`Something went wrong`)
    }

    const {
      data: { user, token }
    } = await API.get(`/auth/facebook/callback${queryString}`)

    setAuthToken(token)
    dispatch({ type: SIGN_IN_FACEBOOK_SUCCEEDED, payload: user })
  } catch (error) {
    removeAuthToken()
    dispatch({ type: SIGN_IN_FACEBOOK_FAILED, payload: { error } })
  }
}

export const signOut = () => async (dispatch) => {
  try {
    dispatch({ type: SIGN_OUT_SENT })

    const {
      data: { success }
    } = await API.delete('/auth')

    if (!success) {
      throw new Error(t`Something went wrong`)
    }

    removeAuthToken()
    dispatch({ type: SIGN_OUT_SUCCEEDED })
  } catch (error) {
    dispatch({ type: SIGN_OUT_FAILED, payload: { error } })
  }
}
