/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { getProfileAction, patchProfileAction, createProfileAction } from './profileActions'
import { logoutAction } from '../auth/authActions'
import { routeChangeAction } from '../commonActions'

const initialState = {
  profile: {},
  profileErr: '',
  isLoading: false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: state => initialState,
    setProfile: (state, action) => {
      state.profile = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfileAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.profile = action.payload
        state.isLoading = false
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.profileErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(createProfileAction.pending, state => {
        state.isLoading = true
      })
      .addCase(createProfileAction.fulfilled, (state, action) => {
        state.profile = action.payload
        state.isLoading = false
      })
      .addCase(createProfileAction.rejected, (state, action) => {
        state.userErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(patchProfileAction.pending, state => {
        state.isLoading = true
      })
      .addCase(patchProfileAction.fulfilled, (state, action) => {
        state.profile = action.payload
        state.isLoading = false
      })
      .addCase(patchProfileAction.rejected, (state, action) => {
        state.profileErr = action.payload
        state.isLoading = false
      }) // ====================================================
      .addCase(logoutAction.fulfilled, (state, action) => initialState)
      .addCase(routeChangeAction, (state, action) => {
        state.profileErr = ''
        state.isLoading = false
      })
  },
})

export const { reset, setProfile } = profileSlice.actions
export default profileSlice.reducer
