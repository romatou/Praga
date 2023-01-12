import { createAsyncThunk } from '@reduxjs/toolkit'

import { axiosInstanceDB } from '../../services/BaseApi'

export type CreateTopic = {
  title: string
  description: string
  userId?: number
  userLogin?: string
}
export type CreateComment = {
  parentId: number | null
  comment: string
  topicId: number
  userId: number
  userLogin: string
}
export type CreateLike = {
  isLike: boolean
  commentId: number
  userId: number
  userLogin: string
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
export const getComments = createAsyncThunk(
  '/topics/get-comments',
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await axiosInstanceDB.post(`/topics/get-comments`, data)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка в отправке данных')
    }
  }
)
export const createComment = createAsyncThunk(
  '/topics/add-comment',
  async (data: CreateComment, thunkAPI) => {
    try {
      const response = await axiosInstanceDB.post(`/topics/add-comment`, data)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка в отправке данных')
    }
  }
)
export const createLike = createAsyncThunk(
  '/topics/add-like',
  async (data: CreateLike, thunkAPI) => {
    try {
      const response = await axiosInstanceDB.post(`/topics/add-like`, data)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка в отправке данных')
    }
  }
)
export const getLikes = createAsyncThunk(
  '/topics/get-likes',
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await axiosInstanceDB.post(`/topics/get-likes`, data)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка в отправке данных')
    }
  }
)
