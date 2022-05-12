import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from './auth/authSlice'
import userReducer from './user/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === 'development' ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
})

export default store
