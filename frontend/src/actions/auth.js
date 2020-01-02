import API from '../services/api'
import oAuthLogin from '../services/oAuthLogin'
import { setAuthToken } from '../services/authToken'
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
    const { data: user } = await API.get('/auth')

    if (!user) {
      throw new Error(user)
    }

    dispatch({ type: GET_CURRENT_USER_SUCCEEDED, payload: user })
  } catch (e) {
    dispatch({ type: GET_CURRENT_USER_FAILED })
  }
}

export const signInLocal = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_LOCAL_SENT })

    const {
      data: { user, token }
    } = await API.post('/auth', { email, password })

    if (!user || !token) {
      throw new Error({ user, token })
    }

    setAuthToken(token)
    dispatch({ type: SIGN_IN_LOCAL_SUCCEEDED, payload: user })
  } catch (e) {
    dispatch({ type: SIGN_IN_LOCAL_FAILED })
  }
}

export const signInGoogle = () => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_GOOGLE_SENT })

    const { data: queryString } = await oAuthLogin('google')

    const {
      data: { user, token }
    } = await API.get(`/auth/google/callback${queryString}`)

    if (!user || !token) {
      throw new Error({ user, token })
    }

    setAuthToken(token)
    dispatch({ type: SIGN_IN_GOOGLE_SUCCEEDED, payload: user })
  } catch (e) {
    dispatch({ type: SIGN_IN_GOOGLE_FAILED })
  }
}

export const signInFacebook = () => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_FACEBOOK_SENT })

    const { data: queryString } = await oAuthLogin('facebook')

    const {
      data: { user, token }
    } = await API.get(`/auth/facebook/callback${queryString}`)

    if (!user || !token) {
      throw new Error({ user, token })
    }

    setAuthToken(token)
    dispatch({ type: SIGN_IN_FACEBOOK_SUCCEEDED, payload: user })
  } catch (e) {
    dispatch({ type: SIGN_IN_FACEBOOK_FAILED })
  }
}

export const signOut = () => async (dispatch) => {
  try {
    dispatch({ type: SIGN_OUT_SENT })
    localStorage.removeItem('session')
    dispatch({ type: SIGN_OUT_SUCCEEDED })
  } catch (e) {
    dispatch({ type: SIGN_OUT_FAILED })
  }
}