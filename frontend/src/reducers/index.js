import { combineReducers } from 'redux'
import config from 'config'
import watcher from './watcher'
import language from './language'
import auth from './auth'
import users from './users'

const reducers = {
  language,
  auth,
  users
}

if (config.NODE_ENV === 'development') {
  reducers.watcher = watcher
}

export default combineReducers(reducers)
