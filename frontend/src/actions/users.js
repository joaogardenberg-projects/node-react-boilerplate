import api from '../services/api'
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
} from './types'

export const fetchUsers = ({ page, limit, query, sort } = {}) => async (
  dispatch
) => {
  try {
    dispatch({ type: FETCH_USERS_SENT })

    const { data } = await api.get('/users', {
      queryString: { page, limit, query, sort }
    })

    dispatch({ type: FETCH_USERS_SUCCEEDED, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILED, payload: { error } })
  }
}

export const fetchUser = ({ id } = {}) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_SENT, payload: { id } })
    const { data: user } = await api.get(`/users/${id}`)
    dispatch({ type: FETCH_USER_SUCCEEDED, payload: user })
  } catch (e) {
    dispatch({ type: FETCH_USER_FAILED, payload: { id } })
  }
}

export const createUser = ({ fields } = {}) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_SENT })
    const { data: user } = await api.post('/users', fields)
    dispatch({ type: CREATE_USER_SUCCEEDED, payload: user })
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILED, payload: { error } })
  }
}

export const updateUser = ({ id, fields } = {}) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_SENT, payload: { id, fields } })
    const { data: user } = await api.put(`/users/${id}`, fields)
    dispatch({ type: UPDATE_USER_SUCCEEDED, payload: user })
  } catch (e) {
    dispatch({ type: UPDATE_USER_FAILED, payload: { id } })
  }
}

export const destroyUser = ({ id } = {}) => async (dispatch) => {
  try {
    dispatch({ type: DESTROY_USER_SENT, payload: { id } })
    const { data: user } = await api.delete(`/users/${id}`)
    dispatch({ type: DESTROY_USER_SUCCEEDED, payload: user })
  } catch (e) {
    dispatch({ type: DESTROY_USER_FAILED, payload: { id } })
  }
}
