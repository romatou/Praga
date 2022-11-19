import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import ratingReducer from './slices/RatingSlice';
import authReducer from './slices/AuthSlice';


const RootReducer = combineReducers({
  rating: ratingReducer,
  auth: authReducer,
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
