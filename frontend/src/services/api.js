import axios from 'axios'
import omit from 'lodash/omit'
import { getAuthToken } from './authToken'
import config from '../config'

export const get = (path, options) => request('get', path, options)

export const post = (path, options) => request('post', path, options)

export const put = (path, options) => request('put', path, options)

export const patch = (path, options) => request('patch', path, options)

export const _delete = (path, options) => request('delete', path, options)

const addQueryString = (path, queryObject = {}) => {
  if (!queryObject || !Object.keys(queryObject).length) {
    return path
  }

  const queryString = Object.keys(queryObject)
    .filter((key) => queryObject[key])
    .map((key) => `${key}=${queryObject[key]}`)
    .join('&')

  if (!queryString) {
    return path
  }

  return `${path}?${queryString}`
}

const request = (method, path, options = {}) => {
  const data = omit(options, 'queryString')

  return axios({
    method,
    data,
    url: `${config.BASE_BACKEND_URL}${addQueryString(
      path,
      options.queryString
    )}`,
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  })
}

export default { get, post, put, patch, delete: _delete }
