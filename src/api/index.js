import axios from 'axios'
import { Auth } from 'aws-amplify'
import { API_URL } from '../config'

const publicAxios = axios.create({
  baseURL: API_URL,
})

const authAxios = axios.create({
  baseURL: API_URL,
})

authAxios.interceptors.request.use(async function (config) {
  try {
    const authUser = await Auth.currentAuthenticatedUser()

    config.headers.authorization = `Bearer ${authUser.signInUserSession.idToken.jwtToken}`
  } catch (error) {
    console.log('Not logged in') // TODO: should probably log the user out here unless we can refresh token
  }

  return config
})

export { publicAxios, authAxios }
