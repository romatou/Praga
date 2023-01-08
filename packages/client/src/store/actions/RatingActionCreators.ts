import { createAsyncThunk } from '@reduxjs/toolkit'
import { Ranking } from '../types'

import { axiosInstance } from '../../services/BaseApi'

const teamName = 'praga-v2'
const ratingFieldName = 'score'

export const fetchLeaderboard = createAsyncThunk(
  'rating/fetchAll',
  async (_, thunkApi) => {
    try {
      const resp = await axiosInstance.post(`leaderboard/${teamName}`, {
        ratingFieldName,
        cursor: 0,
        limit: 5,
      })

      return resp.data
    } catch (e) {
      return thunkApi.rejectWithValue(
        'Не удалось загрузить данные для таблицы лидеров'
      )
    }
  }
)

export const sendDataToLeaderboard = createAsyncThunk(
  'rating/sendToLeaderboard',
  async (data: Ranking, thunkApi) => {
    try {
      await axiosInstance.post('leaderboard', {
        data,
        ratingFieldName,
        teamName,
      })
    } catch (e) {
      return thunkApi.rejectWithValue(
        'Не удалось отправить данные для таблицы лидеров'
      )
    }
  }
)
