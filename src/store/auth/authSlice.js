/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  signUpAction,
  confirmSignUpAction,
  resendConfirmAction,
  loginAction,
  retrieveAuthUserAction,
  logoutAction,
} from './authActions'
import { routeChangeAction } from '../commonActions'

const initialState = {
  cognitoId: '',
  username: '',
  password: '',
  authErr: '',
  isLoading: false,
  isConfirmed: false,
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(signUpAction.fulfilled, (state, action) => {
        state.cognitoId = action.payload.cognitoId
        state.username = action.payload.username
        state.password = action.payload.password
        state.isLoading = false
      })
      .addCase(signUpAction.rejected, (state, action) => {
        state.authErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(confirmSignUpAction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(confirmSignUpAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.username = action.payload
      })
      .addCase(confirmSignUpAction.rejected, (state, action) => {
        state.authErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(resendConfirmAction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(resendConfirmAction.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(resendConfirmAction.rejected, (state, action) => {
        state.authErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(loginAction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.isLoading = false
        state.isConfirmed = false
        state.cognitoId = ''
        state.username = ''
        state.password = ''
        state.authErr = ''
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(retrieveAuthUserAction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(retrieveAuthUserAction.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.isLoading = false
      })
      .addCase(retrieveAuthUserAction.rejected, (state, action) => {
        state.isLoading = false
      }) // ====================================================
      .addCase(logoutAction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(logoutAction.fulfilled, (state, action) => initialState)
      .addCase(logoutAction.rejected, (state, action) => {
        state.isLoading = false
      }) // ====================================================
      .addCase(routeChangeAction, (state, action) => {
        state.authErr = ''
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
