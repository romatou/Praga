import { createAsyncThunk } from '@reduxjs/toolkit'

import { axiosInstanceDB } from '../../services/BaseApi'
import { useAppDispatch } from '../index'

export type CreateTopic = {
  title: string
  description: string
  userId?: number
  userLogin?: string
}

export const getTopics = createAsyncThunk(
  '/topics/all',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstanceDB.get(`/topics/all`)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка в получении данных')
    }
  }
)
export const createTopic = createAsyncThunk(
  '/topics/add',
  async (data: CreateTopic, thunkAPI) => {
    try {
      const response = await axiosInstanceDB.post(`/topics/add`, data)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка в отправке данных')
    }
  }
)
