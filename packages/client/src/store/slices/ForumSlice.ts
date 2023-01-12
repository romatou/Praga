import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getTopics,
  createTopic,
  getComments,
  createComment,
  createLike,
  getLikes,
} from '../actions/ForumActionCreators'

import { RootState } from '../index'
import { ForumState } from '../types'

const initialState: ForumState = {
  topics: [],
  comments: [],
  likes: [],
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
      .addCase(
        getTopics.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload ?? 'Error!'
          state.status = 'FETCH_FAILED'
        }
      )
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
      .addCase(getComments.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(getComments.fulfilled.type, (state, { payload }: PayloadAction<ForumState>) => {
        state.comments = payload.comments
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(getComments.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
      .addCase(createComment.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(createComment.fulfilled.type, state => {
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(createComment.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
      .addCase(createLike.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(createLike.fulfilled.type, (state, { payload }: PayloadAction<ForumState>) => {
        state.likes = payload.likes
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(createLike.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
      .addCase(getLikes.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(getLikes.fulfilled.type, (state, { payload }: PayloadAction<ForumState>) => {
        state.likes = payload.likes
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(getLikes.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
  }

})

export const selectForumData = (state: RootState) => state.forum

export default ForumSlice.reducer
