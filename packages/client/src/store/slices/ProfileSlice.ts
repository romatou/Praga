import { createSlice } from '@reduxjs/toolkit'
import {
  editProfileData,
  editAvatar,
  editPasswordData,
  fetchUser,
} from '@store/actions/ProfileActionCreators'

import { RootState } from '../index'
import { User, RequestData, RequestDataState, StatusLoading } from '../types'

export interface UserState {
  userData: User
  requestData: RequestData
}

const initialState: UserState = {
  userData: {
    avatar: '',
    display_name: '',
    email: '',
    first_name: '',
    id: 0,
    login: '',
    phone: '',
    second_name: '',
    status: '',
  },
  requestData: {
    getUser: {} as RequestDataState<User>,
    editUser: {} as RequestDataState<User>,
    editAvatar: {} as RequestDataState<User>,
    editPassword: {} as RequestDataState,
  },
}

export const UserSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending.type]: state => {
      state.requestData.getUser.status = StatusLoading.IN_PROGRESS
    },
    [fetchUser.fulfilled.type]: (state, { payload }) => {
      state.userData = payload
      state.requestData.getUser.status = StatusLoading.SUCCESS
    },
    [fetchUser.rejected.type]: (state, { payload }) => {
      state.requestData.getUser.errorMessage = payload
      state.requestData.getUser.status = StatusLoading.ERROR
    },

    [editProfileData.pending.type]: state => {
      state.requestData.editUser.status = StatusLoading.IN_PROGRESS
    },
    [editProfileData.fulfilled.type]: (state, { payload }) => {
      state.userData = payload
      state.requestData.editUser.status = StatusLoading.SUCCESS
    },
    [editProfileData.rejected.type]: (state, { payload }) => {
      state.requestData.editUser.errorMessage = payload
      state.requestData.editUser.status = StatusLoading.ERROR
    },

    [editAvatar.pending.type]: state => {
      state.requestData.editAvatar.status = StatusLoading.IN_PROGRESS
    },
    [editAvatar.fulfilled.type]: (state, { payload }) => {
      state.userData = payload
      state.requestData.editAvatar.status = StatusLoading.SUCCESS
    },
    [editAvatar.rejected.type]: (state, { payload }) => {
      state.requestData.editAvatar.errorMessage = payload
      state.requestData.editAvatar.status = StatusLoading.ERROR
    },

    [editPasswordData.pending.type]: state => {
      state.requestData.editPassword.status = StatusLoading.IN_PROGRESS
    },
    [editPasswordData.fulfilled.type]: state => {
      state.requestData.editPassword.status = StatusLoading.SUCCESS
    },
    [editPasswordData.rejected.type]: (state, { payload }) => {
      state.requestData.editPassword.errorMessage = payload
      state.requestData.editPassword.status = StatusLoading.ERROR
    },
  },
})

export const selectProfileData = (state: RootState) => state.profile

export default UserSlice.reducer
