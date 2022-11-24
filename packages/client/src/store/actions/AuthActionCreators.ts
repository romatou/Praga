import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginData, UserData } from '@store/types'
import axiosInstance from '../../services/BaseApi'

export const register = createAsyncThunk(
  'auth/register',
  async (data: UserData, thunkApi) => {
    try {
      const response = await axiosInstance.post('auth/signup', data)
      return response.data
    } catch (e) {
      return thunkApi.rejectWithValue(
        'Не удалось зарегистрировать пользователя'
      )
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, thunkApi) => {
    try {
      const response = await axiosInstance.post('auth/signin', data)
      return response.data
    } catch (e) {
      return thunkApi.rejectWithValue('Не удалось авторизоваться')
    }
  }
)

export const fetchUser = createAsyncThunk('auth/fetch', async (_, thunkApi) => {
  try {
    const response = await axiosInstance.get('auth/user')
    return response.data
  } catch (e) {
    return thunkApi.rejectWithValue('Не удалось загрузить пользователя')
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    const response = await axiosInstance.post('auth/logout')
    return response.data
  } catch (e) {
    return thunkApi.rejectWithValue('Не удалось выйти из приложения')
  }
})
