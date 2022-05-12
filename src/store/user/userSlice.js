/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { getUserByEmailAction, createUserAction, patchUserAction, upsertUserAction } from './userActions'
import { logoutAction } from '../auth/authActions'
import { routeChangeAction } from '../commonActions'

const initialState = {
  user: {},
  users: [],
  userErr: '',
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByEmailAction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getUserByEmailAction.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(getUserByEmailAction.rejected, (state, action) => {
        state.userErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(upsertUserAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(upsertUserAction.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(upsertUserAction.rejected, (state, action) => {
        state.userErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(createUserAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createUserAction.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(createUserAction.rejected, (state, action) => {
        state.userErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(patchUserAction.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(patchUserAction.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(patchUserAction.rejected, (state, action) => {
        state.isLoading = false
      }) // ====================================================
      .addCase(logoutAction.fulfilled, (state, action) => initialState)
      .addCase(routeChangeAction, (state, action) => {
        state.userErr = ''
        state.isLoading = false
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
