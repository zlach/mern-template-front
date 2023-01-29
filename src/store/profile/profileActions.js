import { createAsyncThunk } from '@reduxjs/toolkit'
import { patchUser, getUser, createUser } from '../../api/user'

export const getProfileAction = createAsyncThunk('profile/getProfile', async (params, thunkAPI) => {
  try {
    return await getUser(params)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const patchProfileAction = createAsyncThunk('profile/patchProfile', async (data, thunkAPI) => {
  try {
    return await patchUser(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const createProfileAction = createAsyncThunk('user/createProfile', async (data, thunkAPI) => {
  try {
    return await createUser(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
