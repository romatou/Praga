import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchLeaderboard,
  sendDataToLeaderboard,
} from '@store/actions/RatingActionCreators'

import { useAppSelector } from '../index'
import {
  StatusLoading,
  RequestDataState,
  RequestData,
  RankingResponse,
  Ranking,
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
  extraReducers: {
    [fetchLeaderboard.fulfilled.type]: (
      state,
      { payload }: PayloadAction<RankingResponse[]>
    ) => {
      state.ratingData = payload
      state.requestData.getLeaderboard.status = StatusLoading.SUCCESS
    },
    [fetchLeaderboard.pending.type]: state => {
      state.requestData.getLeaderboard.status = StatusLoading.IN_PROGRESS
    },
    [fetchLeaderboard.rejected.type]: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.requestData.getLeaderboard.errorMessage = payload
      state.requestData.getLeaderboard.status = StatusLoading.ERROR
    },
    [sendDataToLeaderboard.fulfilled.type]: state => {
      state.requestData.addToLeaderboard.status = StatusLoading.SUCCESS
    },
    [sendDataToLeaderboard.pending.type]: state => {
      state.requestData.addToLeaderboard.status = StatusLoading.IN_PROGRESS
    },
    [sendDataToLeaderboard.rejected.type]: state => {
      state.requestData.addToLeaderboard.status = StatusLoading.ERROR
    },
  },
})

export const selectRatingData = () => {
  const { ratingData } = useAppSelector(state => state.rating)

  return ratingData
}

export default ratingSlice.reducer
