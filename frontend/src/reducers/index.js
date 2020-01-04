import { combineReducers } from 'redux'
import config from '../config'
import watcher from './watcher'
import auth from './auth'
import users from './users'

const reducers = { auth, users }

if (config.NODE_ENV === 'development') {
  reducers.watcher = watcher
}

export default combineReducers(reducers)
