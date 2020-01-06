import update from 'immutability-helper'
import mapKeys from 'lodash/mapKeys'
import {
  FETCH_USERS_SENT,
  FETCH_USERS_SUCCEEDED,
  FETCH_USERS_FAILED,
  FETCH_USER_SENT,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED,
  CREATE_USER_SENT,
  CREATE_USER_SUCCEEDED,
  CREATE_USER_FAILED,
  UPDATE_USER_SENT,
  UPDATE_USER_SUCCEEDED,
  UPDATE_USER_FAILED,
  DESTROY_USER_SENT,
  DESTROY_USER_SUCCEEDED,
  DESTROY_USER_FAILED
} from '../actions/types'

const INITIAL_STATE = {
  isFetching: false,
  total: undefined,
  limit: undefined,
  page: undefined,
  maxPage: undefined,
  query: {},
  sort: { updatedAt: -1 },
  records: {}
}

const INITIAL_STATE_SINGLE = {
  isFetching: false,
  name: undefined,
  picture: {
    url: undefined,
    alt: undefined
  },
  email: undefined,
  googleId: undefined,
  facebookId: undefined,
  oAuthEmail: undefined,
  signInProvider: undefined,
  admin: undefined,
  createdAt: undefined,
  updatedAt: undefined
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_USERS_SENT:
      return update(state, { isFetching: { $set: true } })

    case FETCH_USERS_SUCCEEDED: {
      const { total, limit, page, maxPage, query, sort, records } = payload

      return update(state, {
        isFetching: { $set: false },
        total: { $set: total },
        limit: { $set: limit },
        page: { $set: page },
        maxPage: { $set: maxPage },
        query: { $set: query },
        sort: { $set: sort },
        records: {
          $merge: mapKeys(
            records.map((record) =>
              update(INITIAL_STATE_SINGLE, { $merge: record })
            ),
            'id'
          )
        }
      })
    }

    case FETCH_USERS_FAILED:
      return update(state, { isFetching: { $set: false } })

    case FETCH_USER_SENT:
    case UPDATE_USER_SENT:
    case DESTROY_USER_SENT:
      return update(state, {
        records: {
          [payload.id]: {
            $set: update(state[payload.id] || {}, {
              isFetching: { $set: true }
            })
          }
        }
      })

    case FETCH_USER_SUCCEEDED:
    case UPDATE_USER_SUCCEEDED:
      return update(state, {
        records: {
          [payload.id]: {
            $set: update(INITIAL_STATE_SINGLE, { $merge: payload })
          }
        }
      })

    case CREATE_USER_SUCCEEDED:
      return update(state, {
        total: {
          $set: state.total === undefined ? undefined : state.total + 1
        },
        records: {
          [payload.id]: {
            $set: update(INITIAL_STATE_SINGLE, { $merge: payload })
          }
        }
      })

    case DESTROY_USER_SUCCEEDED:
      return update(state, {
        total: {
          $set: state.total === undefined ? undefined : state.total - 1
        },
        records: { $unset: [payload.id] }
      })

    case FETCH_USER_FAILED:
    case UPDATE_USER_FAILED:
    case DESTROY_USER_FAILED:
      return update(state, {
        records: {
          [payload.id]: {
            $set: update(state[payload.id] || {}, {
              isFetching: { $set: false }
            })
          }
        }
      })

    case CREATE_USER_SENT:
    case CREATE_USER_FAILED:
    default:
      return state
  }
}
