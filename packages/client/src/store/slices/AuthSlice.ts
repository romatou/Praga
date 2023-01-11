import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getServiceId,
  login,
  logout,
  oauthYandex,
  register
} from '@store/actions/AuthActionCreators'

import { fetchUser } from '../actions/UserActionCreators'
import { RootState } from '../index'
import {
  OauthData,
  RequestData,
  RequestDataState,
  StatusLoading,
  UserData
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
    getServiceId: {} as RequestDataState,
    oauth: {} as RequestDataState<OauthData>,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled.type, state => {
        state.requestData.signUp.status = StatusLoading.SUCCESS
      })
      .addCase(register.pending.type, state => {
        state.requestData.signUp.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        register.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.signUp.errorMessage = payload
          state.requestData.signUp.status = StatusLoading.ERROR
        }
      )
      .addCase(login.fulfilled.type, state => {
        state.requestData.signIn.status = StatusLoading.SUCCESS
      })
      .addCase(login.pending.type, state => {
        state.requestData.signIn.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        login.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.signIn.errorMessage = payload
          state.requestData.signIn.status = StatusLoading.ERROR
        }
      )
      .addCase(
        fetchUser.fulfilled.type,
        (state, { payload }: PayloadAction<UserData>) => {
          state.user = payload
          state.requestData.getUserInfo.status = StatusLoading.SUCCESS
        }
      )
      .addCase(fetchUser.pending.type, state => {
        state.requestData.getUserInfo.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        fetchUser.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.getUserInfo.errorMessage = payload
          state.requestData.getUserInfo.status = StatusLoading.ERROR
        }
      )
      .addCase(logout.fulfilled.type, state => {
        state.user = {} as UserData
        state.requestData.logout.status = StatusLoading.SUCCESS
      })
      .addCase(logout.pending.type, state => {
        state.requestData.logout.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        logout.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.logout.errorMessage = payload
          state.requestData.logout.status = StatusLoading.ERROR
        }
      )
      .addCase(getServiceId.fulfilled.type, state => {
        state.requestData.getServiceId.status = StatusLoading.SUCCESS
      })
      .addCase(getServiceId.pending.type, state => {
        state.requestData.getServiceId.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        getServiceId.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.getServiceId.errorMessage = payload
          state.requestData.getServiceId.status = StatusLoading.ERROR
        }
      )
      .addCase(oauthYandex.fulfilled.type, state => {
        state.requestData.oauth.status = StatusLoading.SUCCESS
      })
      .addCase(oauthYandex.pending.type, state => {
        state.requestData.oauth.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        oauthYandex.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.oauth.errorMessage = payload
          state.requestData.oauth.status = StatusLoading.ERROR
        }
      )
  },
})

export const selectUserData = (state: RootState) => state.auth.user

export default authSlice.reducer
