import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from './auth/authSlice'
import userReducer from './user/userSlice'
import profileReducer from './profile/profileSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === 'development' ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
})

export default store
