import trim from 'lodash/trim'
import toLower from 'lodash/toLower'

export const formatSignUpData = data => {
  const username = toLower(trim(data.email))

  return {
    username,
    password: data.password,
  }
}

export const formatConfirmData = data => {
  const email = toLower(trim(data.email))
  const code = trim(data.code)

  return {
    email,
    code,
    pwd: data.password,
  }
}

export const formatEmail = email => toLower(trim(email))
