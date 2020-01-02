import axios from 'axios'

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? ''
    : process.env.NODE_ENV === 'staging'
    ? ''
    : `http://localhost:4000`

export const get = (path, options) => {
  return request('get', path, options)
}

export const post = (path, options) => {
  return request('post', path, options)
}

export const put = (path, options) => {
  return request('put', path, options)
}

export const patch = (path, options) => {
  return request('patch', path, options)
}

export const _delete = (path, options) => {
  return request('delete', path, options)
}

const request = (method, path, options) => {
  const jwt = localStorage.getItem('session') || ''

  return axios({
    method,
    url: `${BASE_URL}${path}`,
    data: options,
    headers: { Authorization: `Bearer ${jwt}` }
  })
}

export default { get, post, put, patch, delete: _delete }
