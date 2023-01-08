import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserRequest, PassWord } from '../types'

import { axiosInstance } from '../../services/BaseApi'

export const fetchUser = createAsyncThunk(
  '/user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/auth/user`)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка в получении данных')
    }
  }
)
export const editProfileData = createAsyncThunk(
  '/user/profile',
  async (data: UserRequest, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/user/profile`, data)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка в отправке данных')
    }
  }
)

export const editAvatar = createAsyncThunk(
  '/user/avatar',
  async (data: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/user/profile/avatar`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка')
    }
  }
)

export const editPasswordData = createAsyncThunk(
  '/user/password',
  async (data: PassWord, thunkAPI) => {
    try {
      await axiosInstance.put(`/user/password`, data)
      return 'Сохранено'
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка')
    }
  }
)
