import { createSlice } from '@reduxjs/toolkit'

import {
  StatusLoading,
  RequestDataState,
  RequestData,
  FetchingKey,
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
  reducers: {
    fetching(state, { payload }: { payload: FetchingKey }) {
      state.requestData[payload].status = StatusLoading.IN_PROGRESS
    },
    fetchSuccess(state, { payload }: { payload: FetchingKey }) {
      state.requestData[payload].status = StatusLoading.SUCCESS
    },
    fetchError(
      state,
      {
        payload: { key, errorMessage },
      }: { payload: { key: FetchingKey; errorMessage: string } }
    ) {
      state.requestData[key].errorMessage = errorMessage
      state.requestData[key].status = StatusLoading.ERROR
    },
    fetchLeaderboard(
      state,
      { payload: { key, data } }: { payload: { key: FetchingKey; data: any } }
    ) {
      state.requestData[key].data = data
      state.ratingData = data
    },
  },
})

export default ratingSlice.reducer
