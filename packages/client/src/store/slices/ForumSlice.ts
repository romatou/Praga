import { createSlice, PayloadAction} from '@reduxjs/toolkit'
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
  extraReducers: (builder) => {
    builder
      .addCase(getTopics.pending.type, (state) => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(getTopics.fulfilled.type, (state, { payload }: PayloadAction<ForumState>) => {
        state.topics = payload.topics
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(getTopics.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })

      .addCase(createTopic.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(createTopic.fulfilled.type, state => {
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(createTopic.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
  }
})

export const selectForumData = (state: RootState) => state.forum

export default ForumSlice.reducer
