import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getThemeFromStorage,
  setThemeToStorage,
  SelectedTheme,
} from '../../storage/adapters/theme'
import {
  editProfileData,
  editAvatar,
  editPasswordData,
  fetchUser,
  fetchUserTheme,
  addUserTheme,
  changeUserTheme,
} from '../actions/UserActionCreators'
import { RootState } from '../index'
import { User, RequestData, RequestDataState, StatusLoading } from '../types'

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
    getUserTheme: {} as RequestDataState,
    addUserTheme: {} as RequestDataState,
    changeUserTheme: {} as RequestDataState,
  },
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getTheme: state => {
      state.selectedTheme = getThemeFromStorage(!!state.userData.id)
    },
    toggleTheme: (state, { payload }: PayloadAction<SelectedTheme>) => {
      const newTheme: SelectedTheme = payload === 'dark' ? 'light' : 'dark'

      setThemeToStorage(newTheme, !!state.userData.id)
      state.selectedTheme = newTheme
    },
  },
  extraReducers: {
    [changeUserTheme.pending.type]: state => {
      state.requestData.changeUserTheme.status = StatusLoading.IN_PROGRESS
    },
    [changeUserTheme.fulfilled.type]: (state, { payload: { themeId } }) => {
      const newTheme = themeId === 1 ? 'dark' : 'light'
      state.selectedTheme = newTheme
      setThemeToStorage(newTheme, !!state.userData.id)

      state.requestData.changeUserTheme.status = StatusLoading.SUCCESS
    },
    [changeUserTheme.rejected.type]: (state, { payload }) => {
      state.requestData.changeUserTheme.errorMessage = payload
      state.requestData.changeUserTheme.status = StatusLoading.ERROR
    },

    [addUserTheme.pending.type]: state => {
      state.requestData.addUserTheme.status = StatusLoading.IN_PROGRESS
    },
    [addUserTheme.fulfilled.type]: state => {
      state.requestData.addUserTheme.status = StatusLoading.SUCCESS
    },
    [addUserTheme.rejected.type]: (state, { payload }) => {
      state.requestData.addUserTheme.errorMessage = payload
      state.requestData.addUserTheme.status = StatusLoading.ERROR
    },

    [fetchUserTheme.pending.type]: state => {
      state.requestData.getUserTheme.status = StatusLoading.IN_PROGRESS
    },
    [fetchUserTheme.fulfilled.type]: (state, { payload }) => {
      state.selectedTheme = payload
      state.requestData.getUserTheme.status = StatusLoading.SUCCESS
    },
    [fetchUserTheme.rejected.type]: (state, { payload }) => {
      state.requestData.getUserTheme.errorMessage = payload
      state.requestData.getUserTheme.status = StatusLoading.ERROR
    },

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

export const { toggleTheme, getTheme } = UserSlice.actions

export const selectUserData = (state: RootState) => state.user

export default UserSlice.reducer
