import { createAsyncThunk } from '@reduxjs/toolkit'
import { signUp, login, confirmSignUp, resendConfirm, retrieveAuthUser, logout, forgotPassword } from '../../api/auth'
import { createUserAction, upsertUserAction } from '../user/userActions'

export const signUpAction = createAsyncThunk('auth/signUp', async (data, thunkAPI) => {
  try {
    const res = await signUp(data)

    return res
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const confirmSignUpAction = createAsyncThunk('auth/confirmSignUp', async (data, thunkAPI) => {
  try {
    await confirmSignUp({
      username: data.username,
      code: data.code,
    })

    return
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const resendConfirmAction = createAsyncThunk('auth/resendConfirm', async (data, thunkAPI) => {
  try {
    return await resendConfirm(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const loginAction = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    return await login(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const logoutAction = createAsyncThunk('auth/logout', async (data, thunkAPI) => {
  try {
    return await logout(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const retrieveAuthUserAction = createAsyncThunk('auth/retrieveAuthUser', async (data, thunkAPI) => {
  try {
    return await retrieveAuthUser(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const forgotPasswordAction = createAsyncThunk('auth/forgotPassword', async (data, thunkAPI) => {
  try {
    return await forgotPassword(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
