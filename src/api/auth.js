import { Auth } from 'aws-amplify'
import { ERROR_MESSAGE } from '../utils/constants'

export const signUp = async data => {
  const { username, password } = data

  try {
    const { userSub } = await Auth.signUp({
      username,
      password,
      attributes: {
        email: username,
      },
    })

    return {
      username,
      password,
      cognitoId: userSub,
    }
  } catch (err) {
    throw err.code
  }
}

export const retrieveAuthUser = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    await Auth.currentAuthenticatedUser()
    return
  } catch (err) {
    throw err
  }
}

export const confirmSignUp = async data => {
  try {
    await Auth.confirmSignUp(data.username, data.code)
    return
  } catch (err) {
    throw err.code
  }
}

export const resendConfirm = async data => {
  try {
    await Auth.resendSignUp(data.username)
    return
  } catch (err) {
    throw err.code
  }
}

export const login = async data => {
  try {
    const res = await Auth.signIn(data.username, data.password)

    return res.attributes.sub
  } catch (err) {
    throw err.code
  }
}

export const logout = async () => {
  try {
    await Auth.signOut()
    return
  } catch (err) {
    throw ERROR_MESSAGE.AUTH
  }
}
