import axios from 'axios'
import { FetchingKey, Ranking } from '@store/types'

import { AppDispatch } from '../index'
import { ratingSlice } from '../slices/RatingSlice'
import axiosInstance from '../../services/BaseApi'

const teamName = 'praga'
const ratingFieldName = 'score'

const {
  actions: { fetchError, fetching, fetchSuccess, fetchLeaderboard },
} = ratingSlice

export const sendDataToLeaderboard =
  (data: Ranking) => async (dispatch: AppDispatch) => {
    const key: FetchingKey = 'addToLeaderboard'

    try {
      dispatch(fetching(key))

      await axiosInstance.post('leaderboard', {
        data,
        ratingFieldName,
        teamName,
      })

      dispatch(fetchSuccess(key))
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(
          fetchError({
            key,
            errorMessage: err.response?.data?.reason || err.message,
          })
        )
      } else {
        console.log('unexpected error: ', err)
      }
    }
  }

export const getLeaderboard = () => async (dispatch: AppDispatch) => {
  const key: FetchingKey = 'getLeaderboard'

  try {
    dispatch(fetching(key))

    const resp = await axiosInstance.post(`leaderboard/${teamName}`, {
      ratingFieldName,
      cursor: 0,
      limit: 5,
    })

    dispatch(fetchLeaderboard({ key, data: resp.data }))
    dispatch(fetchSuccess(key))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(
        fetchError({
          key,
          errorMessage: err.response?.data?.reason || err.message,
        })
      )
    } else {
      console.log('unexpected error: ', err)
    }
  }
}
