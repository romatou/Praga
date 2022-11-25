import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  register,
  login,
  fetchUser,
  logout,
} from '@store/actions/AuthActionCreators'
import {
  StatusLoading,
  RequestDataState,
  RequestData,
  UserData,
} from '../types'

export interface AuthState {
  user: UserData
  requestData: RequestData
}

const initialState: AuthState = {
  user: {
    id: undefined,
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  },
  requestData: {
    signUp: {} as RequestDataState,
    signIn: {} as RequestDataState,
    getUserInfo: {} as RequestDataState<UserData>,
    logout: {} as RequestDataState,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled.type]: state => {
      state.requestData.signUp.status = StatusLoading.SUCCESS
    },
    [register.pending.type]: state => {
      state.requestData.signUp.status = StatusLoading.IN_PROGRESS
    },
    [register.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.requestData.signUp.errorMessage = payload
      state.requestData.signUp.status = StatusLoading.ERROR
    },
    [login.fulfilled.type]: state => {
      state.requestData.signIn.status = StatusLoading.SUCCESS
    },
    [login.pending.type]: state => {
      state.requestData.signIn.status = StatusLoading.IN_PROGRESS
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.requestData.signIn.errorMessage = payload
      state.requestData.signIn.status = StatusLoading.ERROR
    },
    [fetchUser.fulfilled.type]: (
      state,
      { payload }: PayloadAction<UserData>
    ) => {
      state.user = payload
      state.requestData.getUserInfo.status = StatusLoading.SUCCESS
    },
    [fetchUser.pending.type]: state => {
      state.requestData.getUserInfo.status = StatusLoading.IN_PROGRESS
    },
    [fetchUser.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.requestData.getUserInfo.errorMessage = payload
      state.requestData.getUserInfo.status = StatusLoading.ERROR
    },
    [logout.fulfilled.type]: state => {
      state.user = {} as UserData
      state.requestData.logout.status = StatusLoading.SUCCESS
    },
    [logout.pending.type]: state => {
      state.requestData.logout.status = StatusLoading.IN_PROGRESS
    },
    [logout.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.requestData.logout.errorMessage = payload
      state.requestData.logout.status = StatusLoading.ERROR
    },
  },
})

export default authSlice.reducer
