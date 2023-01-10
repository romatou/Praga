import { createSlice } from '@reduxjs/toolkit'
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

    [getComments.pending.type]: state => {
      state.status = 'FETCHING'
      state.error = null
    },
    [getComments.fulfilled.type]: (state, { payload }) => {
      state.comments = payload.comments
      state.error = null
      state.status = 'FETCH_FULFILLED'
    },
    [getComments.rejected.type]: (state, { payload }) => {
      state.error = payload ?? 'Error!'
      state.status = 'FETCH_FAILED'
    },

    [createComment.pending.type]: state => {
      state.status = 'FETCHING'
      state.error = null
    },
    [createComment.fulfilled.type]: state => {
      state.error = null
      state.status = 'FETCH_FULFILLED'
    },
    [createComment.rejected.type]: (state, { payload }) => {
      state.error = payload ?? 'Error!'
      state.status = 'FETCH_FAILED'
    },

    [createLike.pending.type]: state => {
      state.status = 'FETCHING'
      state.error = null
    },
    [createLike.fulfilled.type]: (state, { payload }) => {
      state.likes = payload.likes
      state.error = null
      state.status = 'FETCH_FULFILLED'
    },
    [createLike.rejected.type]: (state, { payload }) => {
      state.error = payload ?? 'Error!'
      state.status = 'FETCH_FAILED'
    },

    [getLikes.pending.type]: state => {
      state.status = 'FETCHING'
      state.error = null
    },
    [getLikes.fulfilled.type]: (state, { payload }) => {
      state.likes = payload.likes
      state.error = null
      state.status = 'FETCH_FULFILLED'
    },
    [getLikes.rejected.type]: (state, { payload }) => {
      state.error = payload ?? 'Error!'
      state.status = 'FETCH_FAILED'
    },
  },
})

export const selectForumData = (state: RootState) => state.forum

export default ForumSlice.reducer
