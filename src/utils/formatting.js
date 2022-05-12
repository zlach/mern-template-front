import trim from 'lodash/trim'
import toLower from 'lodash/toLower'

export const formatAuthData = data => {
  const username = toLower(trim(data.email))
  const password = data.password
  const code = trim(data.code)

  return {
    ...(username && { username }),
    ...(password && { password }),
    ...(code && { code }),
  }
}
