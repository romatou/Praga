import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../services/BaseApi'
import { LoginData, OauthData, UserData } from '../../store/types'

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

export const getServiceId = createAsyncThunk(
  'auth/serviceid',
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get('oauth/yandex/service-id')
      return response.data
    } catch (e) {
      return thunkApi.rejectWithValue('No such redirect_uri refistered')
    }
  }
)

export const oauthYandex = createAsyncThunk(
  'auth/yandex',
  async (data: OauthData, thunkApi) => {
    try {
      const response = await axiosInstance.post('oauth/yandex', data)
      return response.data
    } catch (e) {
      return thunkApi.rejectWithValue('Пользователь не авторизован в системе')
    }
  }
)
