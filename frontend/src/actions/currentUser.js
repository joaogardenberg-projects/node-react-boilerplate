import api from '../services/api'
import {
  UPDATE_CURRENT_USER_SENT,
  UPDATE_CURRENT_USER_SUCCEEDED,
  UPDATE_CURRENT_USER_FAILED
} from './types'

export const updateCurrentUser = ({ fields } = {}) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CURRENT_USER_SENT })
    const { data: user } = await api.put('/user', fields)
    dispatch({ type: UPDATE_CURRENT_USER_SUCCEEDED, payload: user })
  } catch (e) {
    dispatch({ type: UPDATE_CURRENT_USER_FAILED })
  }
}
