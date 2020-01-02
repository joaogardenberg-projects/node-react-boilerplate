import axios from 'axios'
import { getAuthToken } from './authToken'

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? ''
    : process.env.NODE_ENV === 'staging'
    ? ''
    : `http://localhost:4000`

export const get = (path, options) => request('get', path, options)

export const post = (path, options) => request('post', path, options)

export const put = (path, options) => request('put', path, options)

export const patch = (path, options) => request('patch', path, options)

export const _delete = (path, options) => request('delete', path, options)

const request = (method, path, options) =>
  axios({
    method,
    url: `${BASE_URL}${path}`,
    data: options,
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  })

export default { get, post, put, patch, delete: _delete }
