import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  editProfileData,
  editAvatar,
  editPasswordData,
  fetchUser,
} from '../actions/UserActionCreators'
import { RootState } from '../index'
import { User, RequestData, RequestDataState, StatusLoading, SelectedTheme } from '../types'

export interface UserState {
  userData: User
  requestData: RequestData
  selectedTheme: SelectedTheme
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
  selectedTheme: 'dark',
  requestData: {
    getUser: {} as RequestDataState<User>,
    editUser: {} as RequestDataState<User>,
    editAvatar: {} as RequestDataState<User>,
    editPassword: {} as RequestDataState,
  },
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getTheme: (state) => {
      const theme = localStorage.getItem('theme');
      if (theme) state.selectedTheme = theme as SelectedTheme
    },
    setTheme: (state, { payload }: PayloadAction<SelectedTheme>) => {
      const newTheme = payload === 'dark' ? 'light' : 'dark'
      state.selectedTheme = newTheme
      localStorage.setItem('theme', newTheme)
    }
  },
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

export const { setTheme } = UserSlice.actions

export const selectUserData = (state: RootState) => state.user

export default UserSlice.reducer
