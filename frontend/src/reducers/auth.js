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
  SIGN_OUT_FAILED,
  UPDATE_CURRENT_USER_SENT,
  UPDATE_CURRENT_USER_SUCCEEDED,
  UPDATE_CURRENT_USER_FAILED,
  UPDATE_USER_SUCCEEDED,
  DESTROY_USER_SUCCEEDED
} from '../actions/types'

const INITIAL_USER_STATE = { isFetching: false }

const INITIAL_STATE = {
  isFetching: false,
  isPresent: false,
  currentUser: INITIAL_USER_STATE
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_USER_SENT:
    case SIGN_IN_LOCAL_SENT:
    case SIGN_IN_GOOGLE_SENT:
    case SIGN_IN_FACEBOOK_SENT:
    case SIGN_OUT_SENT:
      return update(state, { isFetching: { $set: true } })

    case UPDATE_CURRENT_USER_SENT:
      return update(state, { currentUser: { isFetching: { $set: true } } })

    case GET_CURRENT_USER_SUCCEEDED:
    case SIGN_IN_LOCAL_SUCCEEDED:
    case SIGN_IN_GOOGLE_SUCCEEDED:
    case SIGN_IN_FACEBOOK_SUCCEEDED:
      return update(state, {
        isFetching: { $set: false },
        isPresent: { $set: true },
        currentUser: { $set: update(INITIAL_USER_STATE, { $merge: payload }) }
      })

    case UPDATE_CURRENT_USER_SUCCEEDED:
      return update(state, {
        currentUser: { $set: update(INITIAL_USER_STATE, { $merge: payload }) }
      })

    case UPDATE_USER_SUCCEEDED:
      if (state.currentUser.id === payload.id) {
        return update(state, {
          currentUser: { $set: update(INITIAL_USER_STATE, { $merge: payload }) }
        })
      }

      return state

    case DESTROY_USER_SUCCEEDED:
      if (state.currentUser.id === payload.id) {
        return update(state, { $set: INITIAL_STATE })
      }

      return state

    case GET_CURRENT_USER_FAILED:
    case SIGN_IN_LOCAL_FAILED:
    case SIGN_IN_GOOGLE_FAILED:
    case SIGN_IN_FACEBOOK_FAILED:
    case SIGN_OUT_SUCCEEDED:
      return update(state, { $set: INITIAL_STATE })

    case SIGN_OUT_FAILED:
      return update(state, { isFetching: { $set: false } })

    case UPDATE_CURRENT_USER_FAILED:
      return update(state, { currentUser: { isFetching: { $set: false } } })

    default:
      return state
  }
}
