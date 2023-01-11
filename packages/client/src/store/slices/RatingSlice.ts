import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchLeaderboard,
  sendDataToLeaderboard
} from '../actions/RatingActionCreators'

import { useAppSelector } from '../index'
import {
  Ranking,
  RankingResponse,
  RequestData,
  RequestDataState,
  StatusLoading
} from '../types'

export interface RatingState {
  ratingData: RankingResponse[]
  requestData: RequestData
}

const initialState: RatingState = {
  ratingData: [],
  requestData: {
    addToLeaderboard: {} as RequestDataState<Ranking>,
    getLeaderboard: {} as RequestDataState<RankingResponse[]>,
  },
}

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        fetchLeaderboard.fulfilled.type,
        (state, { payload }: PayloadAction<RankingResponse[]>) => {
          state.ratingData = payload
          state.requestData.getLeaderboard.status = StatusLoading.SUCCESS
        }
      )
      .addCase(fetchLeaderboard.pending.type, state => {
        state.requestData.getLeaderboard.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        fetchLeaderboard.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.getLeaderboard.errorMessage = payload
          state.requestData.getLeaderboard.status = StatusLoading.ERROR
        }
      )
      .addCase(sendDataToLeaderboard.fulfilled.type, state => {
        state.requestData.addToLeaderboard.status = StatusLoading.SUCCESS
      })
      .addCase(sendDataToLeaderboard.pending.type, state => {
        state.requestData.addToLeaderboard.status = StatusLoading.IN_PROGRESS
      })
      .addCase(sendDataToLeaderboard.rejected.type, state => {
        state.requestData.addToLeaderboard.status = StatusLoading.ERROR
      })
  },
})

export const selectRatingData = () => {
  const { ratingData } = useAppSelector(state => state.rating)

  return ratingData
}

export default ratingSlice.reducer
