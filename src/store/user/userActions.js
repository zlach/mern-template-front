import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserByEmail, createUser, patchUser, upsertUser } from '../../api/user'

export const getUserByEmailAction = createAsyncThunk('user/getUserByEmail', async (params, thunkAPI) => {
  try {
    return await getUserByEmail(params)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const createUserAction = createAsyncThunk('user/createUser', async (data, thunkAPI) => {
  try {
    return await createUser(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const upsertUserAction = createAsyncThunk('user/upsertUser', async (data, thunkAPI) => {
  try {
    return await upsertUser(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const patchUserAction = createAsyncThunk('user/patchUser', async (data, thunkAPI) => {
  try {
    return await patchUser(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
