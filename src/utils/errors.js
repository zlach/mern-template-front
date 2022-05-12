import { isNil } from 'lodash'
import { ERROR_MESSAGE } from './constants'

export const formatApiError = (err, msg = ERROR_MESSAGE.SERVER) =>
  err.response && !isNil(err.response.status) ? err.response.status : msg
