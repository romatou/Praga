import { createSlice } from '@reduxjs/toolkit'
import { getTopics, createTopic } from '../actions/ForumActionCreators'

import { RootState } from '../index'

export type Topic = {
  user_id: number
  title: string
  description?: string
  id: number
}

export type Comment = {
  id: number
  parentId: number | null
  comment: string
  topic_id: number
  user_id: number
  user_login: string
}

export interface ForumState {
  topics: Topic[]
  comments: Comment[]
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

const initialState: ForumState = {
  topics: [],
  comments: [],
  error: null,
  status: null,
}

export const ForumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: {
    [getTopics.pending.type]: state => {
      state.status = 'FETCHING'
      state.error = null
    },
    [getTopics.fulfilled.type]: (state, { payload }) => {
      state.topics = payload.topics
      state.error = null
      state.status = 'FETCH_FULFILLED'
    },
    [getTopics.rejected.type]: (state, { payload }) => {
      state.error = payload ?? 'Error!'
      state.status = 'FETCH_FAILED'
    },

    [createTopic.pending.type]: state => {
      state.status = 'FETCHING'
      state.error = null
    },
    [createTopic.fulfilled.type]: state => {
      state.error = null
      state.status = 'FETCH_FULFILLED'
    },
    [createTopic.rejected.type]: (state, { payload }) => {
      state.error = payload ?? 'Error!'
      state.status = 'FETCH_FAILED'
    },
  },
})

export const selectForumData = (state: RootState) => state.forum

export default ForumSlice.reducer
