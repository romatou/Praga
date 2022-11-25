import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import authReducer from './slices/AuthSlice'
import ratingReducer from './slices/RatingSlice'
import profileReducer from './slices/ProfileSlice'
import alertReducer from './slices/AlertSlice'

const RootReducer = combineReducers({
  auth: authReducer,
  rating: ratingReducer,
  profile: profileReducer,
  alertReducer: alertReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: RootReducer,
  })
}

export type RootState = ReturnType<typeof RootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
