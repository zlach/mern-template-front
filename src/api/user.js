import queryString from 'query-string'

import { authAxios, publicAxios } from '.'
import { formatApiError } from '../utils/errors'

export const getUser = async params => {
  const { id, includeWickshelf = true } = params

  try {
    const query = queryString.stringify({ includeWickshelf })

    const res = await authAxios.get(`/api/auth/v1/users/${id}?${query}`)

    return res.data
  } catch (err) {
    throw formatApiError(err)
  }
}

export const getUserByEmail = async params => {
  try {
    const { email } = params
    const res = await publicAxios.get(`/api/public/v1/users/${email}`)

    return res.data
  } catch (err) {
    throw formatApiError(err)
  }
} // Not used currently; should consider making this an auth route if used

export const upsertUser = async data => {
  try {
    const res = await authAxios.put(`/api/auth/v1/users/${data.email}`, data)

    return res.data
  } catch (err) {
    throw formatApiError(err)
  }
}

export const createUser = async data => {
  try {
    const res = await publicAxios.post('/api/auth/v1/users', data)

    return res.data
  } catch (err) {
    throw formatApiError(err)
  }
}

export const patchUser = async data => {
  try {
    const { id, ...d } = data
    const res = await authAxios.patch(`/api/auth/v1/users/${id}`, d)

    return res.data
  } catch (err) {
    throw formatApiError(err)
  }
}
