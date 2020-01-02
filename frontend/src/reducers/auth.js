import update from 'immutability-helper'
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
} from '../actions/types'

const INITIAL_STATE = {
  currentUser: { fetching: false, present: false, data: {} }
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_USER_SENT:
    case SIGN_IN_LOCAL_SENT:
    case SIGN_IN_GOOGLE_SENT:
    case SIGN_IN_FACEBOOK_SENT:
    case SIGN_OUT_SENT:
      return update(state, { currentUser: { fetching: { $set: true } } })
    case GET_CURRENT_USER_SUCCEEDED:
    case SIGN_IN_LOCAL_SUCCEEDED:
    case SIGN_IN_GOOGLE_SUCCEEDED:
    case SIGN_IN_FACEBOOK_SUCCEEDED:
      return update(state, {
        currentUser: {
          fetching: { $set: false },
          present: { $set: true },
          data: { $set: payload }
        }
      })
    case GET_CURRENT_USER_FAILED:
    case SIGN_IN_LOCAL_FAILED:
    case SIGN_IN_GOOGLE_FAILED:
    case SIGN_IN_FACEBOOK_FAILED:
    case SIGN_OUT_SUCCEEDED:
      return update(state, {
        currentUser: {
          fetching: { $set: false },
          present: { $set: false },
          data: { $set: {} }
        }
      })
    case SIGN_OUT_FAILED:
      return update(state, { currentUser: { fetching: { $set: false } } })
    default:
      return state
  }
}
